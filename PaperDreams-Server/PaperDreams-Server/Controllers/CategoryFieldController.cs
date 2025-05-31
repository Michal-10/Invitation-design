using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryFieldController : ControllerBase
    {
        private readonly ICategoryFieldService _categoryFieldService;
        private readonly IMapper _mapper;

        public CategoryFieldController(ICategoryFieldService categoryFieldService, IMapper mapper)
        {
            _categoryFieldService = categoryFieldService;
            _mapper = mapper;
        }

        // GET: api/<CategoryFieldController>
        [HttpGet("category/{categoryId}")]
        public async Task<IEnumerable<CategoryFieldDTO>> GetFieldsByCategory(int categoryId)
        {
            return await _categoryFieldService.GetFieldsByCategory(categoryId);
        }
    }
}
