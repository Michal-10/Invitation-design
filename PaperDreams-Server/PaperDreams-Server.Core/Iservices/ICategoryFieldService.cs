using PaperDreams_Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface ICategoryFieldService
    {
        Task<IEnumerable<CategoryFieldDTO>> GetFieldsByCategory(int category);
    }
}
