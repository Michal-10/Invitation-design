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
        Task<TextUpload> UploadTextAsync(TextUploadDTO textUploadDTO);

        // פונקציה לקבלת כתובת URL של קובץ טקסט לפי מזהה הזמנה
        Task<string> GetTextFileUrlAsync(uint id);

        Task<IEnumerable<TextUpload>> GetAllFilesByUserAsync(uint userId);

        Task<TextUpload> UpdateTextUploadAsync(uint id, TextUploadDTO textUploadDTO);

        Task<bool> DeleteTextUploadAsync(uint id);

        Task<bool> DeleteAllFilesByUserAsync(uint userId);

    }
}
