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
        public IEnumerable<User> GetUsers()
        {
            return _dataContext.Users;
        }

        public User? getUserById(uint id)
        {
            return _dataContext.Users.FirstOrDefault(u => u.Id == id);
        }

        public bool AddUser(User user)
        { 
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();
            return true;
        }

        public bool UpdateUser(uint id, User user)
        {
            var userForUpdate = getUserById(id);

            //if (user.Email != null && !string.IsNullOrEmpty(user.Email))
            //    userForUpdate.Email = user.Email;

            //if (user.FirstName != null && !string.IsNullOrEmpty(user.FirstName))
            //    userForUpdate.FirstName = user.FirstName;

            //if (user.LastName != null && !string.IsNullOrEmpty(user.LastName))
            //    userForUpdate.LastName = user.LastName;

            //if (!string.IsNullOrEmpty(user.Password))
            //{
            //    userForUpdate.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            //}

            //_dataContext.SaveChanges();
            //return true;



            var userEntity = getUserById(id);
            if (userEntity == null)
                return false;

            // עדכון רק שדות מותרים
            if (!string.IsNullOrEmpty(user.FirstName))
                userEntity.FirstName = user.FirstName;

            if (!string.IsNullOrEmpty(  user.LastName))
                userEntity.LastName = user.LastName;

            if (!string.IsNullOrEmpty(user.Email))
                userEntity.Email = user.Email;

            // אם המשתמש סיפק סיסמה חדשה, נצפין אותה
            if (!string.IsNullOrEmpty(user.Password))
                userEntity.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            userEntity.Role = userEntity.Role;

            _dataContext.SaveChanges();
            return true;
        }

        public bool DeleteUser(uint id)
        {
            _dataContext.Users.Remove(getUserById(id));
            _dataContext.SaveChanges();
            return true;
        }      
    }
}
