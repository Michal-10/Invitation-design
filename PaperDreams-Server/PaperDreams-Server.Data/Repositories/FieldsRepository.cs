//using Microsoft.EntityFrameworkCore;
//using PaperDreams_Server.Core.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace PaperDreams_Server.Data.Repositories
//{
//    public class FieldsRepository
//    {
//        public DataContext _context;
//        public FieldsRepository(DataContext context)
//        {
//            _context = context;
//        }
//        public async Task<IEnumerable<Field>> GetByCategoriesAsync() //
//        {
//            return await _context.Field.ToListAsync();
//        }
      
//        public async Task<bool> AddAsync(Category category)
//        {
//            await _context.Categories.AddAsync(category);
//            return await _context.SaveChangesAsync() > 0;
//        }

//        public async Task<bool> DeleteAsync(int id)
//        {
//            var category = await GetByIdAsync(id);
//            if (category == null)
//            {
//                return false; // לא נמצא, מחזיר false
//            }

//            _context.Categories.Remove(category);
//            return await _context.SaveChangesAsync() > 0; //נמחק בהצלחה
//        }
//    }

//}
//}
