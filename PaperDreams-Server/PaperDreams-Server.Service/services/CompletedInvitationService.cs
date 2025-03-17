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

        // קבלת כל ההזמנות
        public async Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsAsync()
        {
            var invitations = await _completedInvitationRepository.GetAllCompletedInvitationsAsync();
            return _mapper.Map<IEnumerable<CompletedInvitationDTO>>(invitations);
        }

        //קבלת כל ההזמנות לפי קטגוריה 
        public async Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsByCategoryAsync(int category)
        {
            var invitations = await _completedInvitationRepository.GetCompletedInvitationsByCategoryAsync(category);
            return _mapper.Map<IEnumerable<CompletedInvitationDTO>>(invitations);
        }

        // קבלת כל ההזמנות לפי משתמש
        public async Task<IEnumerable<CompletedInvitationDTO>> GetCompletedInvitationsByUserAsync(int userId)
        {
            var invitations = await _completedInvitationRepository.GetCompletedInvitationsByUserAsync(userId);
            return _mapper.Map<IEnumerable<CompletedInvitationDTO>>(invitations);
        }

        // הוספת הזמנה חדשה
        public async Task<CompletedInvitationDTO> CreateCompletedInvitationAsync(CompletedInvitationDTO invitationDTO)
        {
            var invitationEntity = _mapper.Map<CompletedInvitation>(invitationDTO);
            invitationEntity.CreatedAt = DateTime.Now;
            invitationEntity.UpdatedAt = DateTime.Now;
            var createdInvitation = await _completedInvitationRepository.CreateCompletedInvitationAsync(invitationEntity);
            return _mapper.Map<CompletedInvitationDTO>(createdInvitation);
        }

        // מחיקת הזמנה
        public async Task<bool> DeleteCompletedInvitationAsync(int id)
        {
            return await _completedInvitationRepository.DeleteCompletedInvitationAsync(id);
        }
    }
}
