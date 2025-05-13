using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class StatisticsService:IStatisticsService
    {
        private readonly IStatisticsRepository _repository;

        public StatisticsService(IStatisticsRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> GetTotalTemplatesAsync() => await _repository.GetTotalTemplatesAsync();

        public async Task<int> GetTotalFieldsAsync() => await _repository.GetTotalFieldsAsync();

        public async Task<List<StatisticDto>> GetTemplatesGroupedByCategoryAsync()
            => await _repository.GetTemplatesGroupedByCategoryAsync();

    

        public async Task<List<StatisticDto>> GetDailyLoginStatsAsync()
        {
            return await _repository.GetDailyLoginStatsAsync();
        }

        public async Task<List<StatisticDto>> GetDailyActiveUsersAsync()
        {
            return await _repository.GetDailyActiveUsersAsync();
        }
    }
}
