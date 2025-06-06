﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;
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
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterPostModel registerPostModel)
        {
            var userDto = _mapper.Map<UserDTO>(registerPostModel);

            var (token, user) = await _userService.RegisterAsync(userDto);

            if (user == null)
                return BadRequest("User already exists.");

            return Ok(new
            {
                Token = token,
                User = user
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginPostModel loginPostModel)
        {
            var userDto = _mapper.Map<UserDTO>(loginPostModel);

            var (token, user) = await _userService.LoginAsync(userDto);

            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok(new
            {
                Token = token,
                User = user
            });
        }

        [HttpGet]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpPut("update-profile")]
        public async Task<ActionResult> UpdateUser( [FromBody] UserPostModel userPostModel)
        {
            var userDto = _mapper.Map<UserDTO>(userPostModel);
            var userIdFromToken =  int.Parse(User.FindFirst("userId")?.Value);

            if (!string.IsNullOrEmpty(userDto.Role) && userDto.Role != "string")
                return BadRequest("You cannot change your role.");

            var isSuccess = await _userService.UpdateUserAsync(userIdFromToken, userDto);
            if (isSuccess!=null)
                return Ok(new { message = "Profile updated successfully.", token = isSuccess, user = userDto });

            return BadRequest("Failed to update profile.");
        }


        [HttpDelete("{id}")]
        [Authorize(Policy = "Admin")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            bool isSuccess = await _userService.DeleteUserAsync(id);
            if (isSuccess)
                return Ok(new { message = "User deleted successfully." });

            return NotFound("User not found.");
        }
    }
}


