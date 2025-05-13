using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto> GetByIdAsync(int id);
        Task<bool> AddAsync(CategoryDto template);
        Task<bool> DeleteAsync(int id);
    }
}
