using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;
using PaperDreams_Server.Service.services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
  
    [ApiController]
    [Route("api/templates")]
    [Authorize(Roles = "Admin")]
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

        // ✅ יצירת Template עם תמונה
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] TemplatePostModel model)
        {
            var templateDto = _mapper.Map<TemplateDTO>(model);
            await _templateService.AddAsync(templateDto);
            return CreatedAtAction(nameof(GetAll), new { }, templateDto);
        }

        // ✅ עדכון Template עם תמונה חדשה
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] TemplatePostModel model)
        {
            var templateDto = _mapper.Map<TemplateDTO>(model);

            await _templateService.UpdateAsync(id, templateDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool isSuccess = await _templateService.DeleteAsync(id);
            if (isSuccess)
                return Ok("User deleted successfully.");

            return NotFound("User not found.");

        }
    }
}