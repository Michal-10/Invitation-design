using AutoMapper;
using Microsoft.AspNetCore.Http;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class TemplateService : ITemplateService
    {
       
        private readonly ITemplateRepository _templateRepository;
        private readonly IMapper _mapper;

        public TemplateService(ITemplateRepository templateRepository, IMapper mapper)
        {
            _templateRepository = templateRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TemplateDTO>> GetAllAsync()
        {
            var templates = await _templateRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<TemplateDTO>>(templates);
        }

        public async Task<IEnumerable<TemplateDTO>> GetByCategoryAsync(string category)
        {
            var templates = await _templateRepository.GetByCategoryAsync(category);
            return _mapper.Map<IEnumerable<TemplateDTO>>(templates);
        }

        public async Task<TemplateDTO> GetByIdAsync(uint id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            return _mapper.Map<TemplateDTO>(template);
        }

        public async Task<bool> AddAsync(TemplateDTO model)
        {
            var template = _mapper.Map<Template>(model);
            return await _templateRepository.AddAsync(template);
        }

        public async Task<bool> UpdateAsync(uint id, TemplateDTO model)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null) return false;

            _mapper.Map(model, template);
            template.UpdatedAt = DateTime.Now;
            return await _templateRepository.UpdateAsync(template);
        }

        public async Task<bool> DeleteAsync(uint id)
        {
            return await _templateRepository.DeleteAsync(id);
        }


        public async Task<string> SaveImageAsync(IFormFile image)
        {
            string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string fileName = $"{Guid.NewGuid()}_{image.FileName}";
            string filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return $"/uploads/{fileName}"; // ✅ מחזיר את הנתיב היחסי של התמונה
        }
    }

}
