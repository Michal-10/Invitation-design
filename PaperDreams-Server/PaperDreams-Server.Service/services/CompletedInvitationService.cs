using AutoMapper;
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
    public class CompletedInvitationService : ICompletedInvitationService
    {
        private readonly ICompletedInvitationRepository _completedInvitationRepository;
        private readonly IMapper _mapper;

        public CompletedInvitationService(ICompletedInvitationRepository completedInvitationRepository, IMapper mapper)
        {
            _completedInvitationRepository = completedInvitationRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsAsync()
        {
            var invitations = await _completedInvitationRepository.GetAllCompletedInvitationsAsync();
            return _mapper.Map<IEnumerable<CompletedInvitationDTO>>(invitations);
        }

        public async Task<IEnumerable<CompletedInvitationDTO>> GetCompletedInvitationsByUserAsync(int userId)
        {
            var invitations = await _completedInvitationRepository.GetCompletedInvitationsByUserAsync(userId);
            return _mapper.Map<IEnumerable<CompletedInvitationDTO>>(invitations);
        }

        public async Task<bool> CreateCompletedInvitationAsync(CompletedInvitationDTO invitationDTO)
        {
            var invitationEntity = _mapper.Map<CompletedInvitation>(invitationDTO);
            invitationEntity.CreatedAt = DateTime.Now;
            invitationEntity.UpdatedAt = DateTime.Now;
            return await _completedInvitationRepository.CreateCompletedInvitationAsync(invitationEntity);
        }

      
    }
}
