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

    //[ApiController]
    //[Route("api/templates")]
    //public class TemplateController : ControllerBase
    //{
    //    private readonly ITemplateService _templateService;
    //    private readonly IMapper _mapper;

    //    public TemplateController(ITemplateService templateService, IMapper mapper)
    //    {
    //        _templateService = templateService;
    //        _mapper = mapper;
    //    }

    //    [HttpGet]

    //    public async Task<IActionResult> GetAll()
    //    {
    //        var templates = await _templateService.GetAllAsync();
    //        return Ok(templates);
    //    }

    //    [HttpGet("category/{category}")]
    //    public async Task<IActionResult> GetByCategory(int category)
    //    {
    //        var templates = await _templateService.GetByCategoryAsync(category);
    //        return Ok(templates);
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetById(int id)
    //    {
    //        var template = await _templateService.GetByIdAsync(id);
    //        if (template == null) return NotFound();
    //        return Ok(template);
    //    }

    //    // ✅ יצירת Template עם תמונה
    //    [HttpPost]
    //    //[Authorize(Roles = "Admin")]
    //    public async Task<IActionResult> Create([FromForm] TemplatePostModel model)
    //    {
    //        var userIdFromToken = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
    //        var templateDto = _mapper.Map<TemplateDTO>(model);
    //        templateDto.UserId = userIdFromToken;
    //        await _templateService.AddAsync(templateDto);
    //        return CreatedAtAction(nameof(GetAll), new { }, templateDto);
    //    }

    //    // ✅ עדכון Template עם תמונה חדשה
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> Update(int id, [FromForm] TemplatePostModel model)
    //    {
    //        var templateDto = _mapper.Map<TemplateDTO>(model);

    //        await _templateService.UpdateAsync(id, templateDto);
    //        return NoContent();
    //    }

    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> Delete(int id)
    //    {
    //        bool isSuccess = await _templateService.DeleteAsync(id);
    //        if (isSuccess)
    //            return Ok("User deleted successfully.");

    //        return NotFound("User not found.");

    //    }
    //}
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

        // יצירת Template עם תמונה
        [HttpPost("add")] 
        public async Task<ActionResult<TemplateDTO>> Create([FromBody] TemplatePostModel model)
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized("משתמש לא מחובר");

            var userIdFromToken = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            
            // אם יש תמונה, נטפל בה
            string imageUrl = model.ImageUrl;  // נניח שאתה מקבל את ה-URL של התמונה מהלקוח

            // ממפים את המודל ל-DTO
            var templateDto = _mapper.Map<TemplateDTO>(model);
            templateDto.UserId = userIdFromToken;
            templateDto.ImageUrl = imageUrl;

            return await _templateService.AddAsync(templateDto);
            //return CreatedAtAction(nameof(GetAll), new { }, templateDto);
        }

        // עדכון Template עם תמונה חדשה
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TemplatePostModel model)
        {
            var templateDto = _mapper.Map<TemplateDTO>(model);

            // אם יש תמונה חדשה
            if (!string.IsNullOrEmpty(model.ImageUrl))
            {
                templateDto.ImageUrl = model.ImageUrl;
            }

            await _templateService.UpdateAsync(id, templateDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool isSuccess = await _templateService.DeleteAsync(id);
            if (isSuccess)
                return Ok("Template deleted successfully.");
            return NotFound("Template not found.");
        }
    }
}