using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface ITemplateFieldRepository
    {
        Task<IEnumerable<TemplateField>> GetByTemplateAsync(int category);
        Task<TemplateField> AddAsync(TemplateField model);
        Task<TemplateField> GetByIdAsync(int id);
        Task<TemplateField> getTemplateFieldByFieldAndTemplaet(TemplateField templateField);

        Task<TemplateField> UpdateAsync(TemplateField template);
        Task<bool> DeleteAsync(int id);
    }
}
