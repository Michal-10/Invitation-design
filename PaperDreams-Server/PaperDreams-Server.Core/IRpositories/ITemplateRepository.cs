using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface ITemplateRepository
    {
        //Task<IEnumerable<Template>> GetAllAsync();
        //Task<IEnumerable<Template>> GetByCategoryAsync(int category);
        //Task<Template> GetByIdAsync(int id);
        //Task<bool> AddAsync(Template template);
        //Task<bool> UpdateAsync(Template template);
        //Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Template>> GetAllAsync();
        Task<IEnumerable<Template>> GetByCategoryAsync(int category);
        Task<Template> GetByIdAsync(int id);
        Task<Template> AddAsync(Template template);
        Task<bool> UpdateAsync(Template template);
        Task<bool> DeleteAsync(int id);

    }
}
