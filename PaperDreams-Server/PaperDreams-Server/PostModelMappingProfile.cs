using AutoMapper;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.PostMOdel;

namespace PaperDreams_Server
{
    public class PostModelMappingProfile :Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<TemplatePostModel, TemplateDTO>();
            CreateMap<CompletedInvitationPostModel, CompletedInvitationDTO>();
            CreateMap<TextUploadPostModel, TextUploadDTO>();
        }
    }
}
