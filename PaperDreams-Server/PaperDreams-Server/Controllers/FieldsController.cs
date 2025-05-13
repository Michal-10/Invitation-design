using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldsController : ControllerBase
    {
        // GET: api/<FieldsController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}
        [HttpGet]
        public IEnumerable<string> Get() //get by categories
        {
             return new string[] { "value1", "value2" };

        }

            // GET api/<FieldsController>/5
            //[HttpGet("{id}")]
            //public string Get(int id)
            //{
            //    return "value";
            //}

            // POST api/<FieldsController>
            [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FieldsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FieldsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
