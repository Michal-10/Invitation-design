using Microsoft.AspNetCore.Http;
using PaperDreams_Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface ITemplateService
    {

        Task<IEnumerable<TemplateDTO>> GetAllAsync();
        Task<IEnumerable<TemplateDTO>> GetByCategoryAsync(int category);
        Task<TemplateDTO> GetByIdAsync(uint id);
        Task<bool> AddAsync(TemplateDTO model);
        Task<bool> UpdateAsync(uint id, TemplateDTO model);
        Task<bool> DeleteAsync(uint id);

        // ✅ הוספנו פונקציה לשמירת קובץ
        Task<string> SaveImageAsync(IFormFile image);
    }
}
