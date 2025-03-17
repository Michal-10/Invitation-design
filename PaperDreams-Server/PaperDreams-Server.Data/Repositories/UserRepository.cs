using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
                return await _dataContext.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext.Users.FindAsync(id);
        }

        public async Task<bool> AddUserAsync(User user)
        {
            await _dataContext.Users.AddAsync(user);
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateUserAsync(int id, User user)
        {
            var userEntity = await GetUserByIdAsync(id);
            if (userEntity == null)
                return false;

            // עדכון רק שדות מותרים
            //if (!string.IsNullOrEmpty(user.FirstName))
            userEntity.FirstName = user.FirstName;

            //if (!string.IsNullOrEmpty(  user.LastName))
            userEntity.LastName = user.LastName;

            //if (!string.IsNullOrEmpty(user.Email))
            userEntity.Email = user.Email;

            // אם המשתמש סיפק סיסמה חדשה, נצפין אותה
            //if (!string.IsNullOrEmpty(user.PasswordHash))
            userEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            userEntity.Roles = userEntity.Roles;

            //_dataContext.Users.Update(userEntity);
            _dataContext.Users.Update(userEntity); 
            return await _dataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user == null)
            {
                return false; // לא נמצא, מחזיר false
            }

            _dataContext.Users.Remove(user);
            return await _dataContext.SaveChangesAsync() > 0; //נמחק בהצלחה
        }

    }
}
