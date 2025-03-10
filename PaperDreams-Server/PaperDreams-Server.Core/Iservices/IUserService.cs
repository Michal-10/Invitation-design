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
        //IEnumerable<UserDTO> GetAllUsers();
        //UserDTO getUserById(uint id);
        //public bool AddUser(UserDTO user);
        //public bool UpdateUser(uint id, UserDTO user);
        //public bool DeleteUser(uint id);
        //public string Login(LoginDTO loginDto);
        //public bool Register(RegisterDTO registerDto);





        public bool Register(RegisterDTO registerDto);

        public string Login(LoginDTO loginDto);

        public IEnumerable<UserDTO> GetAllUsers();

        public UserDTO getUserById(uint id);

        public bool UpdateUser(uint id, UserDTO userDto);

        public bool DeleteUser(uint id);

        public bool AddUser(UserDTO user);

    }
}
