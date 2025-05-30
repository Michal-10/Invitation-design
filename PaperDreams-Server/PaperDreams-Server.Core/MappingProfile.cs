using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Template, TemplateDTO>().ReverseMap();
            CreateMap<CompletedInvitation, CompletedInvitationDTO>().ReverseMap();
            CreateMap<CategoryDto, CategoryDTO>().ReverseMap();

            CreateMap<string,Role>().ReverseMap();
            CreateMap<TemplateDTO, Template>().ReverseMap(); 
            CreateMap<TemplateFieldDTO, TemplateField>().ReverseMap();
            CreateMap<Field, FieldDTO>().ReverseMap();
            CreateMap<CategoryField, CategoryFieldDTO>().ReverseMap();


        }
    }
}
