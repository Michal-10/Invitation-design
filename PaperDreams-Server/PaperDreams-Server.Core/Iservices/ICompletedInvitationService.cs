using PaperDreams_Server.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Iservices
{
    public interface ICompletedInvitationService
    {
        Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsAsync();
        Task<IEnumerable<CompletedInvitationDTO>> GetCompletedInvitationsByUserAsync(uint userId);
        Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsByCategoryAsync(uint category);

        Task<CompletedInvitationDTO> CreateCompletedInvitationAsync(CompletedInvitationDTO invitationDTO);
        Task<bool> DeleteCompletedInvitationAsync(uint id);
    }
}
