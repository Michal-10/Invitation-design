using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("total-templates")]
        public async Task<IActionResult> GetTotalTemplates()
        {
            var count = await _statisticsService.GetTotalTemplatesAsync();
            return Ok(count);
        }

        [HttpGet("total-fields")]
        public async Task<IActionResult> GetTotalFields()
        {
            var count = await _statisticsService.GetTotalFieldsAsync();
            return Ok(count);
        }

        [HttpGet("templates-by-category")]
        public async Task<IActionResult> GetTemplatesGroupedByCategory()
        {
            var data = await _statisticsService.GetTemplatesGroupedByCategoryAsync();
            return Ok(data);
        }

      

        [HttpGet("daily-logins")]
        public async Task<IActionResult> GetDailyLogins()
        {
            //var stats = await _statisticsService.GetDailyLoginStatsAsync();
            //return Ok(stats);

            try
            {
                var data = await _statisticsService.GetDailyLoginStatsAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetDailyActiveUsers: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("active-users-daily")]
        public async Task<IActionResult> GetDailyActiveUsers()
        {
            //var data = await _statisticsService.GetDailyActiveUsersAsync();
            //return Ok(data);


            try
            {
                var data = await _statisticsService.GetDailyActiveUsersAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetDailyActiveUsers: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

        }
    }
}
