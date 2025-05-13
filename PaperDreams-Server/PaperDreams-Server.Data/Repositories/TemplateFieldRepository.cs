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
    public class TemplateFieldRepository : ITemplateFieldRepository
    {
        private readonly DataContext _context;

        public TemplateFieldRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<TemplateField> getTemplateFieldByFieldAndTemplaet(TemplateField templateField)
        {
            return await _context.TemplateField.Where(t => t.TemplateId == templateField.TemplateId && t.FieldId == templateField.FieldId).FirstOrDefaultAsync();
        }

        public async Task<TemplateField> AddAsync(TemplateField model)
        {
            //     await _context.TemplateField.AddAsync(model);

            //    return await _context.SaveChangesAsync() > 0 ;

            await _context.TemplateField.AddAsync(model);
            await _context.SaveChangesAsync();
            return model; // After saving, the model's Id property will be populated

        }

        public async Task<TemplateField> GetByIdAsync(int id)
        {
            return await _context.TemplateField.FindAsync(id);
        }

        public async Task<IEnumerable<TemplateField>> GetByTemplateAsync(int category)
        {
            return await _context.TemplateField.Where(t=>t.TemplateId == category).ToListAsync();
        }

        public async Task<TemplateField> UpdateAsync(TemplateField templateField)
        {
            _context.ChangeTracker.Clear();

            _context.TemplateField.Update(templateField);
            await _context.SaveChangesAsync() ;
            return templateField;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var templateFieldToDelete = await _context.TemplateField.FindAsync(id);
            if (templateFieldToDelete != null)
            {
                _context.TemplateField.Remove(templateFieldToDelete);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
        }
    }
}
