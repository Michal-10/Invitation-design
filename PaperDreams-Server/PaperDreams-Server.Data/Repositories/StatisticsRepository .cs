using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data.Repositories
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly DataContext _context;

        public StatisticsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalTemplatesAsync()
            => await _context.Templates.CountAsync();

        public async Task<int> GetTotalFieldsAsync()
            => await _context.TemplateField.CountAsync();

        public async Task<List<StatisticDto>> GetTemplatesGroupedByCategoryAsync()
        {
            return await _context.Templates.Include(t=>t.Category)
                .GroupBy(t =>  t.Category.Name)
                .Select(g => new StatisticDto
                {
                    CategoryName = g.Key,
                    Count = g.Count()
                }).ToListAsync();
        }

        public async Task<List<StatisticDto>> GetDailyLoginStatsAsync()
        {
            return await _context.Users
                .GroupBy(l => l.created_at.Date)
                .Select(g => new StatisticDto
                {
                    Date = g.Key,
                    Count = g.Count()
                }).OrderBy(g => g.Date)
                .ToListAsync();
        }

        public async Task<List<StatisticDto>> GetDailyActiveUsersAsync()
        {
            return await _context.Users
                .GroupBy(u => u.UpdatedAt.Date)
                .Select(g => new StatisticDto
                {
                    Date = g.Key,
                    Count = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToListAsync();
        }
    }
}
