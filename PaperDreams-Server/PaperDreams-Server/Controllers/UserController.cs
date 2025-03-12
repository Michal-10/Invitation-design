using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.Service.services;
using System.Data;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{

    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            var token = await _userService.RegisterAsync(registerDto);
            if (token == null)
                return Unauthorized("Email already exists");

            return Ok(token);
        }

        // ✅ התחברות
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var token = await _userService.LoginAsync(loginDto);
            if (token == null)
                return Unauthorized("Invalid email or password");

            return Ok(token);
        }

        // ✅ רק מנהל יכול לראות את כל המשתמשים
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        // ✅ כל משתמש יכול לראות רק את עצמו
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> GetUserById(uint id)
        {
            var user = await _userService.getUserByIdAsync(id);
            if (user == null)
                return NotFound();

            var userIdFromToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userIdFromToken != id && userRole != "Admin")
                return Forbid(); // חסימת גישה

            return user;
        }

        // ✅ עדכון פרופיל אישי (משתמש יכול לעדכן רק את עצמו)


        //[HttpPut("update-profile")]
        //[Authorize]
        //public async Task<ActionResult> UpdateUser(uint id, [FromBody] UserDTO userDto)
        //{
        //    var userIdFromToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        //    if (!string.IsNullOrEmpty(userDto.Role) && userDto.Role != "string")
        //        return BadRequest("You cannot change your role.");

        //    bool isSuccess = await _userService.UpdateUserAsync(id, userDto);
        //    if (isSuccess)
        //        return Ok("Profile updated successfully.");

        //    return BadRequest("Failed to update profile.");
        //}
        [HttpPut("update-profile/{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateUser(uint id, [FromBody] UserDTO userDto)
        {
            var userIdFromToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (userIdFromToken != id)
                return Forbid(); // חסימת גישה אם ה-ID לא תואם

            if (!string.IsNullOrEmpty(userDto.Role) && userDto.Role != "string")
                return BadRequest("You cannot change your role.");

            bool isSuccess = await _userService.UpdateUserAsync(id, userDto);
            if (isSuccess)
                return Ok("Profile updated successfully.");

            return BadRequest("Failed to update profile.");
        }


        // ✅ מחיקת משתמש (Admin בלבד)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUser(uint id)
        {
            bool isSuccess = await _userService.DeleteUserAsync(id);
            if (isSuccess)
                return Ok("User deleted successfully.");

            return NotFound("User not found.");
        }
    }
}


