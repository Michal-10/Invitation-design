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

        public Task<string> RegisterAsync(RegisterDTO registerDto);

        public Task<string> LoginAsync(LoginDTO loginDto);

        public Task<IEnumerable<UserDTO>> GetAllUsersAsync();

        public Task<UserDTO> getUserByIdAsync(uint id);

        public Task<bool> UpdateUserAsync(uint id, UserDTO userDto);

        public Task<bool> DeleteUserAsync(uint id);

        public Task<bool> AddUserAsync(UserDTO user);

    }
}
