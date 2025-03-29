using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface IUserService
    {

        public Task<(string Token, UserDTO User)> RegisterAsync(UserDTO userDto);

        public Task<(string Token, UserDTO User)> LoginAsync(UserDTO userDto);

        public Task<IEnumerable<UserDTO>> GetAllUsersAsync();

        public Task<UserDTO> getUserByIdAsync(int id);

        public Task<bool> UpdateUserAsync(int id, UserDTO userDto);

        public Task<bool> DeleteUserAsync(int id);

        public Task<bool> AddUserAsync(UserDTO user);

    }
}
