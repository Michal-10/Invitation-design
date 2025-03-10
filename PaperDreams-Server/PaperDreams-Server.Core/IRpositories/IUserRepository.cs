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
        public IEnumerable<User> GetUsers();
        User? getUserById(uint id);
        public bool AddUser(User card);
        public bool UpdateUser(uint id, User card);
        public bool DeleteUser(uint id);
    }
}
