using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateFieldController : ControllerBase
    {

        private readonly ITemplateFieldService _templateFieldService;
        private readonly IMapper _mapper;

        public TemplateFieldController(ITemplateFieldService templateFieldService, IMapper mapper)
        {
            _templateFieldService = templateFieldService;
            _mapper = mapper;
        }

        // GET: api/<TemplateFieldController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<TemplateFieldController>/5
        [HttpGet("{id}")]
        public async Task<IEnumerable<TemplateFieldDTO>> GetFieldsByTemplate(int id)
        {
            var fields = await _templateFieldService.GetByTemplateAsync(id);
            return _mapper.Map<IEnumerable<TemplateFieldDTO>>(fields);
        }

        // POST api/<TemplateFieldController>
        [HttpPost("add")]
        public async Task<TemplateFieldDTO> Post([FromBody] TemplateFieldPostModel templateFieldPM)
        {
            var templateFieldDTO = _mapper.Map<TemplateFieldDTO>(templateFieldPM);
            return await _templateFieldService.AddAsync(templateFieldDTO);
        }


        // PUT api/<TemplateFieldController>/5
        [HttpPut("update/{id}")]
        public async Task<ActionResult<TemplateFieldDTO>> Put(int id, [FromBody] TemplateFieldPostModel templateFieldPM)
        {
            //var templateFieldDTO = _mapper.Map<TemplateFieldDTO>(templateFieldPM);
            //templateFieldDTO.Id = id; // Ensure the ID is set for updating
            //var result = await _templateFieldService.UpdateAsync(id, templateFieldDTO);
            //return Ok(result);


            var templateFieldDTO = _mapper.Map<TemplateFieldDTO>(templateFieldPM);
            var createdTemplateField = await _templateFieldService.UpdateAsync(id,templateFieldDTO);
            if (createdTemplateField == null)
            {
                return BadRequest("Failed to add template field.");
            }
            return Ok(createdTemplateField);
        }

        // DELETE api/<TemplateFieldController>/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _templateFieldService.DeleteAsync(id);
            return Ok(result);
        }
    }
}
