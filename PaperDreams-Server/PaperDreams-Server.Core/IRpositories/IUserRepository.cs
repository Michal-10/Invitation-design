using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        public Task<bool> AddUserAsync(User card);
        public Task<bool> UpdateUserAsync(int id, User card);
        public Task<bool> DeleteUserAsync(int id);
    }
}
