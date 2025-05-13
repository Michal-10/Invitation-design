using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface ITemplateFieldService
    {
        Task<IEnumerable<TemplateFieldDTO>> GetByTemplateAsync(int category);
        Task<TemplateFieldDTO> AddAsync(TemplateFieldDTO model);
        public Task<TemplateFieldDTO> UpdateAsync(int id, TemplateFieldDTO model);
        Task<bool> DeleteAsync(int id);
    }
}
