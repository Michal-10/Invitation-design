using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task<bool> AddAsync(CategoryDTO model)
        {
            var category = _mapper.Map<CategoryDto>(model);
            category.CreatedAt = DateTime.Now;
            category.UpdateAt = DateTime.Now;
            return await _categoryRepository.AddAsync(category);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _categoryRepository.DeleteAsync(id);

        }

    
    }
}
