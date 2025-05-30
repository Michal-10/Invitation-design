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
        Task<IEnumerable<CompletedInvitationDTO>> GetCompletedInvitationsByUserAsync(int userId);

        Task<bool> CreateCompletedInvitationAsync(CompletedInvitationDTO invitationDTO);
    }
}
