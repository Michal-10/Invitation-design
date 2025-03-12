using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data.Repositories
{
    public class TextUploadRepository : ITextUploadRepository
    {
        private readonly DataContext _context;

        public TextUploadRepository(DataContext context)
        {
            _context = context;
        }

        // יצירת רשומת טקסט חדשה בטבלה
        public async Task<TextUpload> AddTextUploadAsync(TextUpload textUpload)
        {
            _context.TextUploads.Add(textUpload);
            await _context.SaveChangesAsync();
            return textUpload;
        }

        // קבלת קובץ לפי מזהה
        public async Task<TextUpload> GetTextUploadByIdAsync(uint id)
        {
            return await _context.TextUploads .FirstOrDefaultAsync(tu => tu.Id == id);
        }

        // שליפת כל הקבצים של משתמש מסוים
        public async Task<IEnumerable<TextUpload>> GetTextUploadsByUserIdAsync(uint userId)
        {
            return await _context.TextUploads.Where(tu => tu.UserId == userId).ToListAsync();
        }

        // עדכון קובץ
        public async Task<TextUpload> UpdateTextUploadAsync(TextUpload textUpload)
        {
            _context.TextUploads.Update(textUpload);
            await _context.SaveChangesAsync();
            return textUpload;
        }

        // מחיקת קובץ לפי מזהה
        public async Task<bool> DeleteTextUploadAsync(uint id)
        {
            var file = await _context.TextUploads.FindAsync(id);
            if (file != null)
            {
                _context.TextUploads.Remove(file);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }
    }
}
