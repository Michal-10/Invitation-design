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


        //private readonly IUserRepository _userRepository;
        //private readonly IMapper _mapper;
        //private readonly JwtService _jwtService;

        //public UserService(IUserRepository userRepository, IMapper mapper, JwtService jwtService)
        //{
        //    _userRepository = userRepository;
        //    _mapper = mapper;
        //    _jwtService = jwtService;
        //}

        //public string Login(string email, string password)
        //{
        //    var user = _userRepository.GetUsers().FirstOrDefault(u => u.Email == email && u.Password == password);
        //    if (user == null)
        //    {
        //        return null; // או לזרוק שגיאה מתאימה
        //    }

        //    return _jwtService.GenerateToken(user);
        //}

        ////public readonly IUserRepository _userRepository;
        ////readonly IMapper _mapper;
        ////public UserService(IUserRepository userRepository, IMapper mapper)
        ////{
        ////    _userRepository = userRepository;
        ////    _mapper = mapper;
        ////}
        //public IEnumerable<UserDTO> GetAllUsers()
        //{
        //    var users = _userRepository.GetUsers();
        //    return _mapper.Map<IEnumerable<UserDTO>>(users);
        //}

        //public UserDTO getUserById(uint id)
        //{
        //    return _mapper.Map<UserDTO>(_userRepository.getUserById(id));
        //}
        //public bool AddUser(UserDTO user)
        //{
        //    var userEntity = _mapper.Map<User>(user);
        //    var userFind = _userRepository.getUserById(userEntity.Id);
        //    if (userFind == null)
        //    {
        //        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        //        _userRepository.AddUser(userEntity);
        //        //_repositoryManager.save();
        //        return true;
        //    }
        //    return false;
        //}


        //public bool UpdateUser(uint id, UserDTO user)
        //{
        //    var userFind = _userRepository.getUserById(id);
        //    if (userFind != null)
        //    {
        //        var userEntity = _mapper.Map<User>(user);
        //        _userRepository.UpdateUser(id, userEntity);
        //        //_repositoryManager.save();
        //        return true;
        //    }
        //    return false;
        //}

        //public bool DeleteUser(uint id)
        //{
        //    var userFind = _userRepository.getUserById(id);
        //    if (userFind != null)
        //    {
        //        _userRepository.DeleteUser(id);
        //        //_repositoryManager.save();
        //        return true;
        //    }
        //    return false;
        //}

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
        public bool Register(RegisterDTO registerDto)
        {
            if (_userRepository.GetUsers().Any(u => u.Email == registerDto.Email))
                return false; // משתמש כבר קיים

            var newUser = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Password = HashPassword(registerDto.Password),
                Role = registerDto.Role ?? "User" // ברירת מחדל: User
            };

            _userRepository.AddUser(newUser);
            return true;
        }

        // ✅ התחברות
        public string Login(LoginDTO loginDto)
        {
            var user = _userRepository.GetUsers().FirstOrDefault(u => u.Email == loginDto.Email);
            if (user == null || !VerifyPassword(loginDto.Password, user.Password))
                return null; // אימייל או סיסמה שגויים

            return _jwtService.GenerateToken(user);
        }

        // ✅ החזרת רשימת משתמשים (Admin בלבד)
        public IEnumerable<UserDTO> GetAllUsers()
        {
            var users = _userRepository.GetUsers();
            return _mapper.Map<IEnumerable<UserDTO>>(users);
        }

        // ✅ החזרת משתמש לפי ID
        public UserDTO getUserById(uint id)
        {
            return _mapper.Map<UserDTO>(_userRepository.getUserById(id));
        }

        // ✅ עדכון משתמש (משתמש יכול לעדכן רק את עצמו)
        public bool UpdateUser(uint id, UserDTO userDto)
        {
            var userFind = _userRepository.getUserById(id);
            if (userFind != null)
            {
                var userEntity = _mapper.Map<User>(userDto);
                _userRepository.UpdateUser(id, userEntity);
                //_repositoryManager.save();
                return true;
            }
            return false;
        }

        // ✅ מחיקת משתמש (Admin בלבד)
        public bool DeleteUser(uint id)
        {
            var userFind = _userRepository.getUserById(id);
            if (userFind != null)
            {
                _userRepository.DeleteUser(id);
                //_repositoryManager.save();
                return true;
            }
            return false;
        }

        // ✅ פונקציות עזר להצפנה
        private string HashPassword(string password)
        { 
          return  BCrypt.Net.BCrypt.HashPassword(password); 
        }
        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
           return BCrypt.Net.BCrypt.Verify(inputPassword, storedPassword);
        }

        public bool AddUser(UserDTO user)
        {
            var userEntity = _mapper.Map<User>(user);
            var userFind = _userRepository.getUserById(userEntity.Id);
            if (userFind == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                _userRepository.AddUser(userEntity);
                //_repositoryManager.save();
                return true;
            }
            return false;
        }


    }
}
