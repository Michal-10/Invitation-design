﻿using AutoMapper;
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
        public async Task<IEnumerable<CategoryFieldDTO>> GetFieldsByCategory(int categoryId)//get by category
        {
            return await _categoryFieldService.GetFieldsByCategory(categoryId);
        }

        // GET api/<CategoryFieldController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoryFieldController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoryFieldController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryFieldController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
