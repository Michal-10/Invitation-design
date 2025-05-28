using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class UserService:IUserService //שירות משתמשים
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;

        public UserService(IUserRepository userRepository, IMapper mapper, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        // ✅ רישום משתמש חדש
        public async Task<(string Token, UserDTO User)> RegisterAsync(UserDTO userDto)
        {
            if ((await _userRepository.GetUsersAsync()).Any(u => u.Email == userDto.Email))
                return (null, null); // משתמש כבר קיים

            var newUser = _mapper.Map<User>(userDto);
            var role = _mapper.Map<Role>(userDto.Role);
            role.Description = "";
            role.RoleName = userDto.Role;
            newUser.Roles = new List<Role> { role };
            newUser.created_at = DateTime.Now;
            newUser.UpdatedAt = DateTime.Now;
            newUser.PasswordHash = HashPassword(userDto.Password); 

            await _userRepository.AddUserAsync(newUser);

            var token = _jwtService.GenerateToken(newUser);

            var userResponse = _mapper.Map<UserDTO>(newUser);

            return (token, userResponse);
        }

        // ✅ התחברות
        public async Task<(string Token, UserDTO User)> LoginAsync(UserDTO userDto)
        {
            var user = (await _userRepository.GetUsersAsync()).FirstOrDefault(u => u.Email == userDto.Email);
            if (user == null || !VerifyPassword(userDto.Password, user.PasswordHash))
                return (null, null); // אימייל או סיסמה שגויים

            var token = _jwtService.GenerateToken(user);

            // מיפוי המשתמש חזרה ל-DTO כדי לא לחשוף מידע רגיש
            var userResponse = _mapper.Map<UserDTO>(user);

            return (token, userResponse);
        }

        // ✅ החזרת רשימת משתמשים (Admin בלבד)
        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        public async Task<List<string>> GetEmailUsersAsync()
        {
            return await _userRepository.GetEmailUsersAsync();
        }

        //// ✅ החזרת משתמש לפי ID
        //public async Task<UserDTO> getUserByIdAsync(int id)
        //{
        //    return _mapper.Map<UserDTO>(await _userRepository.GetUserByIdAsync(id));
        //}

        public async Task<bool> AddUserAsync(UserDTO user)
        {
            var userEntity = _mapper.Map<User>(user);
            var userFind = await _userRepository.GetUserByIdAsync(userEntity.Id);
            if (userFind == null)
            {
                user.Password = HashPassword(user.Password);
                await _userRepository.AddUserAsync(userEntity);
                return true;
            }
            return false;
        }

        public async Task<string> UpdateUserAsync(int id, UserDTO userDto)
        {
            var userFind = await _userRepository.GetUserByIdAsync(id);
            if (userFind != null)
            {
                var userEntity = _mapper.Map<User>(userDto);
                userEntity.UpdatedAt = DateTime.Now;
                userEntity.PasswordHash = userDto.Password;
                var resUser = await _userRepository.UpdateUserAsync(id,userEntity);
                if (resUser != null)
                    return _jwtService.GenerateToken(resUser);
            }
            return null;
        }

        // ✅ מחיקת משתמש (Admin בלבד)
        public async Task<bool> DeleteUserAsync(int id)
        {
            var userFind = await _userRepository.GetUserByIdAsync(id);
            if (userFind == null)
            {
                return false; // משתמש לא נמצא
            }
            await _userRepository.DeleteUserAsync(id);
            return true;
        }

        // ✅ פונקציות עזר להצפנה
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, storedPassword);
        }

    }
}
