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
    public class TemplateRepository : ITemplateRepository
    {
        //private readonly DataContext _context;

        //public TemplateRepository(DataContext context)
        //{
        //    _context = context;
        //}

        //public async Task<IEnumerable<Template>> GetAllAsync()
        //{
        //    return await _context.Templates.ToListAsync();
        //}

        //public async Task<IEnumerable<Template>> GetByCategoryAsync(int category)
        //{
        //    return await _context.Templates.Where(t => t.CategoryId == category).ToListAsync();
        //}

        //public async Task<Template> GetByIdAsync(int id)
        //{
        //    return await _context.Templates.FindAsync(id);
        //}

        //public async Task<bool> AddAsync(Template template)
        //{
        //    await _context.Templates.AddAsync(template);
        //    return await _context.SaveChangesAsync() > 0;
        //}

        //public async Task<bool> UpdateAsync(Template template)
        //{
        //    _context.Templates.Update(template);
        //    return await _context.SaveChangesAsync() > 0;
        //}

        //public async Task<bool> DeleteAsync(int id)
        //{
        //    var template = await GetByIdAsync(id);
        //    if (template == null)
        //    {
        //        return false; // לא נמצא, מחזיר false
        //    }

        //    _context.Templates.Remove(template);
        //    return await _context.SaveChangesAsync() > 0; //נמחק בהצלחה
        //}
        private readonly DataContext _context;

        public TemplateRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Template>> GetAllAsync()
        {
            return await _context.Templates
                //.Include(t=>t.Fields)
                .ToListAsync();
        }

        public async Task<IEnumerable<Template>> GetByCategoryAsync(int category)
        {
            return await _context.Templates.Where(t => t.CategoryId == category)
                .Include(t=>t.TemplateFields).ThenInclude(f=>f.Field)
                .ToListAsync();
        }

        public async Task<Template> GetByIdAsync(int id)
        {
            return await _context.Templates.FindAsync(id);
        }

        public async Task<Template> AddAsync(Template template)
        {
            await _context.Templates.AddAsync(template);
            await _context.SaveChangesAsync() ;
            return template;
        }

        public async Task<bool> UpdateAsync(Template template)
        {
            _context.Templates.Update(template);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var template = await GetByIdAsync(id);
            if (template == null)
            {
                return false; // לא נמצא, מחזיר false
            }

            _context.Templates.Remove(template);
            return await _context.SaveChangesAsync() > 0; // נמחק בהצלחה
        }

    }
}
