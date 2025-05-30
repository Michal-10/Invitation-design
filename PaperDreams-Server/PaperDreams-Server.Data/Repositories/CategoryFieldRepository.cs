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
    public class CategoryFieldRepository : ICategoryFieldRepository
    {

        public DataContext _context;
        public CategoryFieldRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryField>> GetFieldsByCategory(int categoryId)
        {
            return await _context.CategoryField.Where(u => u.CategoryId == categoryId).Include(u=>u.Field).ToListAsync();
        }
    }
}
