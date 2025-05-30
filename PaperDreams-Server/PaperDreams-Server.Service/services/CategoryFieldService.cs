using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class CategoryFieldService : ICategoryFieldService
    {
        private readonly ICategoryFieldRepository _categoryFieldRepository;
        private readonly IMapper _mapper;

        public CategoryFieldService(ICategoryFieldRepository categoryFieldRepository, IMapper mapper)
        {
            _categoryFieldRepository = categoryFieldRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CategoryFieldDTO>> GetFieldsByCategory(int categoryId)
        {
            var categoryFields = await _categoryFieldRepository.GetFieldsByCategory(categoryId);
            return _mapper.Map<IEnumerable<CategoryFieldDTO>>(categoryFields);
        }
    }
}
