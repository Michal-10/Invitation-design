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
        Task<IEnumerable<CompletedInvitationDTO>> GetCompletedInvitationsByUserAsync();
        Task<IEnumerable<CompletedInvitationDTO>> GetAllCompletedInvitationsByCategoryAsync(int category);

        Task<bool> CreateCompletedInvitationAsync(CompletedInvitationDTO invitationDTO);
        Task<bool> DeleteCompletedInvitationAsync(int id);
    }
}
