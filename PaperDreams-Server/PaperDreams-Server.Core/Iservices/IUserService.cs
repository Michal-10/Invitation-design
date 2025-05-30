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

        Task<(string Token, UserDTO User)> RegisterAsync(UserDTO userDto);

        Task<(string Token, UserDTO User)> LoginAsync(UserDTO userDto);

        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<List<string>> GetEmailUsersAsync();


        Task<string> UpdateUserAsync(int id, UserDTO userDto);

        Task<bool> DeleteUserAsync(int id);

        Task<bool> AddUserAsync(UserDTO user);

    }
}
