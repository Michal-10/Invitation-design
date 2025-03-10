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
    //[Route("api/[controller]")]
    //[ApiController]
    //public class UserController : ControllerBase
    //{
    //    private readonly IUserService _userService;
    //    public UserController(IUserService userService)
    //    {
    //        _userService = userService;
    //    }
    //    // GET: api/<UserController>
    //    [HttpGet]
    //    public ActionResult<IEnumerable<UserDTO>> Get()
    //    {
    //        return Ok(_userService.GetAllUsers());
    //    }

    //    // GET api/<UserController>/5
    //    [HttpGet("{id}")]
    //    public ActionResult<UserDTO> Get(uint id)
    //    {
    //        if (id <= 0)
    //            return BadRequest();
    //        var user = _userService.getUserById(id);
    //        if (user == null)
    //            return NotFound();
    //        return user;
    //    }

    //    // POST api/<UserController>
    //    [HttpPost]
    //    public ActionResult Post([FromBody] UserDTO user)
    //    {
    //        //var userDTO = _mapper.Map<BuyingDTO>(value);
    //        bool isSuccess = _userService.AddUser(user);
    //        //bool isSuccess = _buyingService.AddBuying(value);
    //        if (isSuccess)
    //            return Ok(true);
    //        return BadRequest("ID exists in the system"); ;
    //    }

    //    // PUT api/<UserController>/5
    //    [HttpPut("{id}")]
    //    public ActionResult Put(uint id, [FromBody] UserDTO user)
    //    {
    //        //var buyingDTO = _mapper.Map<BuyingDTO>(value);
    //        bool isSuccess = _userService.UpdateUser(id, user);
    //        if (isSuccess)
    //            return Ok(true);
    //        return NotFound();
    //    }

    //    // DELETE api/<UserController>/5
    //    [HttpDelete("{id}")]
    //    public ActionResult Delete(uint id)
    //    {
    //        bool isSuccess = _userService.DeleteUser(id);
    //        if (isSuccess)
    //            return Ok(true);
    //        return NotFound();
    //    }
    //}











    //[Route("api/[controller]")]
    //[ApiController]
    //[Authorize] // דורש אימות לכל הבקשות
    //public class UserController : ControllerBase
    //{
    //    private readonly IUserService _userService;

    //    public UserController(IUserService userService)
    //    {
    //        _userService = userService;
    //    }

    //    // רק מנהל יכול לראות את כל המשתמשים
    //    [HttpGet]
    //    [Authorize(Roles = "Admin")]
    //    public ActionResult<IEnumerable<UserDTO>> Get()
    //    {
    //        return Ok(_userService.GetAllUsers());
    //    }

    //    // כל משתמש יכול לראות רק את עצמו
    //    [HttpGet("{id}")]
    //    [Authorize]
    //    public ActionResult<UserDTO> Get(uint id)
    //    {
    //        var user = _userService.getUserById(id);
    //        if (user == null)
    //            return NotFound();

    //        // בדיקה שהמשתמש מחפש רק את עצמו, אלא אם הוא Admin
    //        var userIdFromToken = uint.Parse(User.FindFirst("sub")?.Value);
    //        var userRole = User.FindFirst("role")?.Value;
    //        if (userIdFromToken != id && userRole != "Admin")
    //        {
    //            return Forbid(); // חסימת גישה
    //        }

    //        return user;
    //    }
    //    [HttpPut("update-profile")]
    //    [Authorize] // רק משתמשים מחוברים יכולים לגשת
    //    public ActionResult UpdateProfile([FromBody] UserDTO userDto)
    //    {
    //        var userIdFromToken = uint.Parse(User.FindFirst("sub")?.Value);

    //        // אסור למשתמש לשנות את התפקיד שלו
    //        if (!string.IsNullOrEmpty(userDto.Role))
    //            return BadRequest("You cannot change your role.");

    //        bool isSuccess = _userService.UpdateUser(userIdFromToken, userDto);
    //        if (isSuccess)
    //            return Ok("Profile updated successfully.");

    //        return BadRequest("Failed to update profile.");
    //    }

    //    // DELETE api/<UserController>/5
    //    [HttpDelete("{id}")]
    //    [Authorize]
    //    [Authorize(Roles = "Admin")]
    //    public ActionResult Delete(uint id)
    //    {
    //        bool isSuccess = _userService.DeleteUser(id);
    //        if (isSuccess)
    //            return Ok(true);
    //        return NotFound();
    //    }
    //}



    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // ✅ רישום משתמש חדש
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDTO registerDto)
        {
            var success = _userService.Register(registerDto);
            if (!success)
                return BadRequest("Email already exists");

            return Ok("User registered successfully");
        }

        // ✅ התחברות
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO loginDto)
        {
            var token = _userService.Login(loginDto);
            if (token == null)
                return Unauthorized("Invalid email or password");

            return Ok(token);
        }

        // ✅ רק מנהל יכול לראות את כל המשתמשים
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<IEnumerable<UserDTO>> GetAllUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        // ✅ כל משתמש יכול לראות רק את עצמו
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<UserDTO> GetUserById(uint id)
        {
            var user = _userService.getUserById(id);
            if (user == null)
                return NotFound();

            // בדיקה שהמשתמש מחפש רק את עצמו, אלא אם הוא Admin
            var userIdFromToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userIdFromToken != id && userRole != "Admin")
                return Forbid(); // חסימת גישה

            return user;
        }

        // ✅ עדכון פרופיל אישי (משתמש יכול לעדכן רק את עצמו)
        [HttpPut("update-profile")]
        [Authorize]
        public ActionResult UpdateUser(uint id,[FromBody] UserDTO userDto)
        {
            var userIdFromToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            // אסור למשתמש לשנות את התפקיד שלו
            if (userDto.Role!="string"&& !string.IsNullOrEmpty(userDto.Role))
                return BadRequest("You cannot change your role.");

            bool isSuccess = _userService.UpdateUser(id,userDto);
            if (isSuccess)
                return Ok("Profile updated successfully.");

            return BadRequest("Failed to update profile.");
        }

        // ✅ מחיקת משתמש (Admin בלבד)
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteUser(uint id)
        {
            bool isSuccess = _userService.DeleteUser(id);
            if (isSuccess)
                return Ok("User deleted successfully.");

            return NotFound("User not found.");
        }
    }
}


