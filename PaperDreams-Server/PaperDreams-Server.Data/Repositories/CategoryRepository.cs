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
    public class CategoryRepository : ICategoryRepository
    {
        public DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
        public async Task<CategoryDto> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }
        public async Task<bool> AddAsync(CategoryDto category)
        {
            await _context.Categories.AddAsync(category);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await GetByIdAsync(id);
            if (category == null)
            {
                return false; 
            }

            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}
