using AutoMapper;
using Microsoft.AspNetCore.Http;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class TextUploadService : ITextUploadService
    {
        private readonly ITextUploadRepository _textUploadRepository;
        private readonly IMapper _mapper;

        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        public TextUploadService(ITextUploadRepository textUploadRepository, IMapper mapper)
        {
            _textUploadRepository = textUploadRepository;
            _mapper = mapper;   

            // לוודא שהתיקייה קיימת
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        // שמירת הקובץ והחזרת המודל
        public async Task<TextUpload> UploadTextAsync(TextUploadDTO textUploadDTO)
        {
            // שמירת הקובץ לוקלית
            var fileUrl = await SaveFileLocallyAsync(textUploadDTO.File);

            // יצירת אובייקט TextUpload חדש
            var textUpload = _mapper.Map<TextUpload>(textUploadDTO);
            textUpload.FileUrl = fileUrl; 
            return await _textUploadRepository.AddTextUploadAsync(textUpload);
        }

        // שמירת הקובץ בתיקיית Uploads
        private async Task<string> SaveFileLocallyAsync(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(_uploadDirectory, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        // קבלת הנתיב של הקובץ
        public async Task<string> GetTextFileUrlAsync(uint id)
        {
            var textUpload = await _textUploadRepository.GetTextUploadByIdAsync(id);
            return textUpload?.FileUrl;
        }

        // שליפת קובץ לפי מזהה
        public async Task<TextUpload> GetTextUploadByIdAsync(uint id)
        {
            return await _textUploadRepository.GetTextUploadByIdAsync(id);
        }

        // עדכון קובץ (לא בהכרח עדכון של התוכן, אלא פרטים על הקובץ)
        public async Task<TextUpload> UpdateTextUploadAsync(uint id, TextUploadDTO textUploadDTO)
        {
            var textUpload = await _textUploadRepository.GetTextUploadByIdAsync(id);

            if (textUpload == null)
            {
                return null;
            }

            // אם צריך, אפשר לעדכן את המידע בפרטי הקובץ
            textUpload.UserId = textUploadDTO.UserId;
            textUpload.UpdatedAt = DateTime.Now;

            return await _textUploadRepository.UpdateTextUploadAsync(textUpload);
        }

        // מחיקת קובץ לפי מזהה
        public async Task<bool> DeleteTextUploadAsync(uint id)
        {
            return await _textUploadRepository.DeleteTextUploadAsync(id);
        }


        // שליפת כל הקבצים של משתמש מסוים
        public async Task<IEnumerable<TextUpload>> GetAllFilesByUserAsync(uint userId)
        {
            return await _textUploadRepository.GetTextUploadsByUserIdAsync(userId);
        }

        // מחיקת כל הקבצים של משתמש מסוים
        public async Task<bool> DeleteAllFilesByUserAsync(uint userId)
        {
            var userFiles = await _textUploadRepository.GetTextUploadsByUserIdAsync(userId);

            if (userFiles == null || !userFiles.Any())
                return false;

            foreach (var file in userFiles)
            {
                var filePath = Path.Combine(_uploadDirectory, file.FileUrl);
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }

                await _textUploadRepository.DeleteTextUploadAsync(file.Id);
            }

            return true;
        }

    }
}
