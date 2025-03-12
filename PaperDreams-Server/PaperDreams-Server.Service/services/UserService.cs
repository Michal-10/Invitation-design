﻿using AutoMapper;
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
        
        public async Task<string> RegisterAsync(RegisterDTO registerDto)
        {
            if ((await _userRepository.GetUsersAsync()).ToList().Any(u => u.Email == registerDto.Email))
                return null; // משתמש כבר קיים

            var newUser = _mapper.Map<User>(registerDto);
            newUser.PasswordHash = HashPassword(registerDto.Password); // הצפנת הסיסמה ✅
            await _userRepository.AddUserAsync(newUser);

            return await LoginAsync(_mapper.Map<LoginDTO>(registerDto));
            //return _jwtService.GenerateToken(newUser); // מחזיר את ה-token לאחר הרשמה מוצלחת
        }

        // ✅ התחברות
        public async Task<string> LoginAsync(LoginDTO loginDto)
        {
            var user = (await _userRepository.GetUsersAsync()).FirstOrDefault(u => u.Email == loginDto.Email);
            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
                return null; // אימייל או סיסמה שגויים

            return _jwtService.GenerateToken(user);
        }

        // ✅ החזרת רשימת משתמשים (Admin בלבד)
        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetUsersAsync();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        // ✅ החזרת משתמש לפי ID
        public async Task<UserDTO> getUserByIdAsync(uint id)
        {
            return _mapper.Map<UserDTO>(await _userRepository.GetUserByIdAsync(id));
        }

        public async Task<bool> AddUserAsync(UserDTO user)
        {
            var userEntity = _mapper.Map<User>(user);
            var userFind = await _userRepository.GetUserByIdAsync(userEntity.Id);
            if (userFind == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                await _userRepository.AddUserAsync(userEntity);
                return true;
            }
            return false;
        }

        // ✅ עדכון משתמש (משתמש יכול לעדכן רק את עצמו)
        public async Task<bool> UpdateUserAsync(uint id, UserDTO userDto)
        {
            var userFind = await _userRepository.GetUserByIdAsync(id);
            if (userFind != null)
            {
                var userEntity = _mapper.Map<User>(userDto);
                //userEntity.UpdatedAt = DateTime.Now;
                //await _userRepository.UpdateUserAsync(id, userEntity);
                if (!string.IsNullOrEmpty(userDto.FirstName))
                    userEntity.FirstName = userDto.FirstName;

                if (!string.IsNullOrEmpty(userDto.LastName))
                    userEntity.LastName = userDto.LastName;

                if (!string.IsNullOrEmpty(userDto.Email))
                    userEntity.Email = userDto.Email;

                return true;
            }
            return false;
        }

        // ✅ מחיקת משתמש (Admin בלבד)
        public async Task<bool> DeleteUserAsync(uint id)
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
