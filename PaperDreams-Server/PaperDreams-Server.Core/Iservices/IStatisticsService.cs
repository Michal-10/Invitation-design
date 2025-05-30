using PaperDreams_Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface IStatisticsService
    {
        Task<int> GetTotalTemplatesAsync();
        Task<int> GetTotalFieldsAsync();
        Task<List<StatisticDto>> GetTemplatesGroupedByCategoryAsync();
        Task<List<StatisticDto>> GetDailyLoginStatsAsync();
        Task<List<StatisticDto>> GetDailyActiveUsersAsync();


    }
}
