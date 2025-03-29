using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.PostMOdel;

namespace PaperDreams_Server
{
    public class PostModelMappingProfile :Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<TemplatePostModel, TemplateDTO>().ReverseMap(); ;
            CreateMap<CompletedInvitationPostModel, CompletedInvitationDTO>().ReverseMap(); ;
            CreateMap<TextUploadPostModel, TextUploadDTO>().ReverseMap(); ;
            CreateMap<UserPostModel, UserDTO>().ReverseMap();
            CreateMap<RegisterPostModel, UserDTO>().ReverseMap();
            CreateMap<LoginPostModel, UserDTO>().ReverseMap();
            CreateMap<LoginDTO, UserDTO>().ReverseMap(); ;
            CreateMap<RegisterDTO, UserDTO>().ReverseMap(); 
            CreateMap<CategoryDTO, CategoryPostModel>().ReverseMap(); 
            CreateMap<TemplateDTO, TemplatePostModel>().ReverseMap(); 
            
        }
    }
}
