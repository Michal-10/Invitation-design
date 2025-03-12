﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompletedInvitationController : ControllerBase
    {
        private readonly ICompletedInvitationService _completedInvitationService;
        private readonly IMapper _mapper;

        public CompletedInvitationController(ICompletedInvitationService completedInvitationService, IMapper mapper)
        {
            _completedInvitationService = completedInvitationService;
            _mapper = mapper;
        }

        // הוספת הזמנה חדשה
        [HttpPost("create")]
        public async Task<IActionResult> CreateCompletedInvitation([FromBody] CompletedInvitationPostModel model)
        {
            // המרת המודל ל-DTO
            var completedInvitationDTO = _mapper.Map<CompletedInvitationDTO>(model);

            var createdInvitation = await _completedInvitationService.CreateCompletedInvitationAsync(completedInvitationDTO);

            if (createdInvitation == null)
            {
                return BadRequest("Failed to create invitation.");
            }

            return CreatedAtAction(nameof(GetCompletedInvitations), new { id = createdInvitation.Id }, createdInvitation);
        }

        // קבלת כל ההזמנות
        [HttpGet]
        public async Task<IActionResult> GetCompletedInvitations()
        {
            var invitations = await _completedInvitationService.GetAllCompletedInvitationsAsync();
            return Ok(invitations);
        }

        // קבלת כל ההזמנות לפי משתמש
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCompletedInvitationsByUser(uint userId)
        {
            var invitations = await _completedInvitationService.GetCompletedInvitationsByUserAsync(userId);
            if (invitations == null || !invitations.Any())
            {
                return NotFound("No invitations found for this user.");
            }
            return Ok(invitations);
        }

        // קבלת כל ההזמנות לפי קטגוריה
        [HttpGet("user/{category}")]
        public async Task<IActionResult> GetCompletedInvitationsByCategory(uint category)
        {
            var invitations = await _completedInvitationService.GetAllCompletedInvitationsByCategoryAsync(category);
            if (invitations == null || !invitations.Any())
            {
                return NotFound("No invitations found for this user.");
            }
            return Ok(invitations);
        }

        // מחיקת הזמנה
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompletedInvitation(uint id)
        {
            var success = await _completedInvitationService.DeleteCompletedInvitationAsync(id);
            if (!success)
            {
                return NotFound("Completed invitation not found.");
            }
            return NoContent();
        }
    }
}
