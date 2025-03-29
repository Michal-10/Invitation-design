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

        //private readonly ITemplateRepository _templateRepository;
        //private readonly IMapper _mapper;

        //public TemplateService(ITemplateRepository templateRepository, IMapper mapper)
        //{
        //    _templateRepository = templateRepository;
        //    _mapper = mapper;
        //}

        //public async Task<IEnumerable<TemplateDTO>> GetAllAsync()
        //{
        //    var templates = await _templateRepository.GetAllAsync();
        //    return _mapper.Map<IEnumerable<TemplateDTO>>(templates);
        //}

        //public async Task<IEnumerable<TemplateDTO>> GetByCategoryAsync(int category)
        //{
        //    var templates = await _templateRepository.GetByCategoryAsync(category);
        //    return _mapper.Map<IEnumerable<TemplateDTO>>(templates);
        //}

        //public async Task<TemplateDTO> GetByIdAsync(int id)
        //{
        //    var template = await _templateRepository.GetByIdAsync(id);
        //    return _mapper.Map<TemplateDTO>(template);
        //}

        //public async Task<bool> AddAsync(TemplateDTO model)
        //{
        //    var template = _mapper.Map<Template>(model);
        //    template.CreatedAt = DateTime.Now;
        //    template.UpdatedAt = DateTime.Now;
        //    return await _templateRepository.AddAsync(template);
        //}

        //public async Task<bool> UpdateAsync(int id, TemplateDTO model)
        //{
        //    var template = await _templateRepository.GetByIdAsync(id);
        //    if (template == null) return false;

        //    _mapper.Map(model, template);
        //    template.UpdatedAt = DateTime.Now;
        //    return await _templateRepository.UpdateAsync(template);
        //}

        //public async Task<bool> DeleteAsync(int id)
        //{
        //    return await _templateRepository.DeleteAsync(id);
        //}
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

        public async Task<IEnumerable<TemplateDTO>> GetByCategoryAsync(int category)
        {
            var templates = await _templateRepository.GetByCategoryAsync(category);
            return _mapper.Map<IEnumerable<TemplateDTO>>(templates);
        }

        public async Task<TemplateDTO> GetByIdAsync(int id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            return _mapper.Map<TemplateDTO>(template);
        }

        public async Task<bool> AddAsync(TemplateDTO model)
        {
            var template = _mapper.Map<Template>(model);
            template.CreatedAt = DateTime.Now;
            template.UpdatedAt = DateTime.Now;
            return await _templateRepository.AddAsync(template);
        }

        public async Task<bool> UpdateAsync(int id, TemplateDTO model)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null) return false;

            _mapper.Map(model, template);
            template.UpdatedAt = DateTime.Now;
            return await _templateRepository.UpdateAsync(template);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _templateRepository.DeleteAsync(id);
        }

    }

}
