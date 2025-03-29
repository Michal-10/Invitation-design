using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;
using PaperDreams_Server.Service.services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextUploadController : ControllerBase
    {
        private readonly ITextUploadService _textUploadService;
        private readonly IMapper _mapper;

        public TextUploadController(ITextUploadService textUploadService, IMapper mapper)
        {
            _textUploadService = textUploadService;
            _mapper = mapper;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadText([FromBody] TextUploadPostModel textUploadPostModel)
        {
            var file = textUploadPostModel.FileUrl;
            var textUploadDTO = _mapper.Map<TextUploadDTO>(textUploadPostModel);

            if (file == null)
            {
                return BadRequest("No file uploaded.");
            }

            var result = await _textUploadService.UploadTextAsync(textUploadDTO);
            if (result != null)
            {
                return Ok("TextUpload sucessfull");
            }
            return BadRequest("Failed to upload text.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var fileUrl = await _textUploadService.GetTextFileUrlAsync(id);
            if (string.IsNullOrEmpty(fileUrl))
            {
                return NotFound("File not found.");
            }

            return Ok(fileUrl);
        }

        // PUT - עדכון פרטי קובץ
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTextUpload(int id, [FromBody] TextUploadPostModel textUploadPostModel)
        {
            var textUploadDTO = _mapper.Map<TextUploadDTO>(textUploadPostModel);
            var updatedTextUpload = await _textUploadService.UpdateTextUploadAsync(id, textUploadDTO);
            if (updatedTextUpload != null)
            {
                return Ok(updatedTextUpload);
            }

            return BadRequest("Failed to update text upload.");
        }

        
        // DELETE - מחיקת קובץ לפי מזהה
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTextUpload(int id)
        {
            var success = await _textUploadService.DeleteTextUploadAsync(id);
            if (success)
            {
                return NoContent();
            }

            return NotFound("Text upload not found.");
        }

        // שליפת כל הקבצים למשתמש מסוים
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserFiles(int userId)
        {
            var files = await _textUploadService.GetAllFilesByUserAsync(userId);
            if (files == null || !files.Any())
            {
                return NotFound("No files found for this user.");
            }

            return Ok(files);
        }

        // מחיקת כל הקבצים של משתמש מסוים
        [HttpDelete("user/{userId}")]
        public async Task<IActionResult> DeleteUserFiles(int userId)
        {
            var success = await _textUploadService.DeleteAllFilesByUserAsync(userId);
            if (success)
            {
                return Ok("All files deleted successfully.");
            }

            return BadRequest("Failed to delete files.");
        }
    }
}