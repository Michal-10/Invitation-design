using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;
using PaperDreams_Server.Service.services;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [ApiController]
    [Route("api/templates")]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateService _templateService;
        private readonly IMapper _mapper;

        public TemplateController(ITemplateService templateService, IMapper mapper)
        {
            _templateService = templateService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var templates = await _templateService.GetAllAsync();
            return Ok(templates);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetByCategory(int category)
        {
            var templates = await _templateService.GetByCategoryAsync(category);
            return Ok(templates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var template = await _templateService.GetByIdAsync(id);
            if (template == null) return NotFound();
            return Ok(template);
        }

        [HttpPost("add")] 
        public async Task<ActionResult<TemplateDTO>> Create([FromBody] TemplatePostModel model)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized("משתמש לא מחובר");

            var userIdFromToken = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            
            string imageUrl = model.ImageUrl; 

            var templateDto = _mapper.Map<TemplateDTO>(model);
            templateDto.UserId = userIdFromToken;
            templateDto.ImageUrl = imageUrl;

            return await _templateService.AddAsync(templateDto);
        }
    }
}