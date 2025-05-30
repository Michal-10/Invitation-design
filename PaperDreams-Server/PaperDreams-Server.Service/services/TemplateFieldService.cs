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
    public class TemplateFieldService : ITemplateFieldService
    {
        private readonly ITemplateFieldRepository _templateFieldRepository;
        private readonly IMapper _mapper;

        public TemplateFieldService(ITemplateFieldRepository templateFieldRepository, IMapper mapper)
        {
            _templateFieldRepository = templateFieldRepository;
            _mapper = mapper;
        }

        public async Task<TemplateFieldDTO> AddAsync(TemplateFieldDTO model)
        {
            var templateField = _mapper.Map<TemplateField>(model);
            var addedEntity = await _templateFieldRepository.AddAsync(templateField);
            return _mapper.Map<TemplateFieldDTO>(addedEntity);
        }

        public async Task<IEnumerable<TemplateFieldDTO>> GetByTemplateAsync(int category)
        {
            var fields = await _templateFieldRepository.GetByTemplateAsync(category);
            return _mapper.Map<IEnumerable<TemplateFieldDTO>>(fields);
        }


        public async Task<TemplateFieldDTO> UpdateAsync(int id, TemplateFieldDTO model)
        {
            var templateField = _mapper.Map<TemplateField>(model);
            var templateToUpdate = await _templateFieldRepository.getTemplateFieldByFieldAndTemplaet(templateField);
            templateField.Id = templateToUpdate.Id;
            var template = await _templateFieldRepository.UpdateAsync(templateField);

            return _mapper.Map<TemplateFieldDTO>(template);

        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _templateFieldRepository.DeleteAsync(id);
        }

     
    }
}
