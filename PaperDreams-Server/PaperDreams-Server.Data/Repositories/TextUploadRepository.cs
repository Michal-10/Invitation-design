//using Microsoft.EntityFrameworkCore;
//using PaperDreams_Server.Core.Entities;
//using PaperDreams_Server.Core.IRpositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace PaperDreams_Server.Data.Repositories
//{
//    public class TextUploadRepository : ITextUploadRepository
//    {
//        private readonly DataContext _context;

//        public TextUploadRepository(DataContext context)
//        {
//            _context = context;
//        }

//        // קבלת קובץ לפי מזהה
//        public async Task<TextUpload> GetTextUploadByIdAsync(int id)
//        {
//            return await _context.TextUploads .FirstOrDefaultAsync(tu => tu.Id == id);
//        }

//        // שליפת כל הקבצים של משתמש מסוים
//        public async Task<IEnumerable<TextUpload>> GetTextUploadsByUserIdAsync(int userId)
//        {
//            return await _context.TextUploads.Where(tu => tu.UserId == userId).ToListAsync();
//        }

//        // יצירת רשומת טקסט חדשה בטבלה
//        public async Task<bool> AddTextUploadAsync(TextUpload textUpload)
//        {
//            _context.TextUploads.Add(textUpload);
//            //return await _context.SaveChangesAsync() > 0;
//            {
//                try
//                {
//                    _context.TextUploads.Add(textUpload);
//                    return await _context.SaveChangesAsync() > 0;
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine($"Error saving to DB: {ex.Message}");
//                    throw; // זורקים את השגיאה שוב כדי לקבל פרטים נוספים ב- API
//                }
//            }
//        }

//        // עדכון קובץ
//        public async Task<bool> UpdateTextUploadAsync(TextUpload textUpload)
//        {
//            _context.TextUploads.Update(textUpload);
//            return await _context.SaveChangesAsync() > 0;
             
//        }

//        // מחיקת קובץ לפי מזהה
//        public async Task<bool> DeleteTextUploadAsync(int id)
//        {
//            var file = await _context.TextUploads.FindAsync(id);
//            if (file != null)
//            {
//                _context.TextUploads.Remove(file);
//                return await _context.SaveChangesAsync() > 0;
//            }
//            return false;
//        }
//    }
//}
