using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface ITextUploadService
    {
        // פונקציה להעלאת טקסט (עם קובץ) עבור הזמנה
        Task<bool> UploadTextAsync(TextUploadDTO textUploadDTO);

        // פונקציה לקבלת כתובת URL של קובץ טקסט לפי מזהה הזמנה
        Task<string> GetTextFileUrlAsync(int id);

        Task<IEnumerable<TextUpload>> GetAllFilesByUserAsync(int userId);

        Task<bool> UpdateTextUploadAsync(int id, TextUploadDTO textUploadDTO);

        Task<bool> DeleteTextUploadAsync(int id);

        Task<bool> DeleteAllFilesByUserAsync(int userId);

    }
}
