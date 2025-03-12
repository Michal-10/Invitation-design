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
        Task<IEnumerable<Template>> GetAllAsync();
        Task<IEnumerable<Template>> GetByCategoryAsync(string category);
        Task<Template> GetByIdAsync(uint id);
        Task<bool> AddAsync(Template template);
        Task<bool> UpdateAsync(Template template);
        Task<bool> DeleteAsync(uint id);
    }
}
