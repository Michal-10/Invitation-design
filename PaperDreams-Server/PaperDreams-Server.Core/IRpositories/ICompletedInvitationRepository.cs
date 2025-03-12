using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface ICompletedInvitationRepository
    {
        Task<IEnumerable<CompletedInvitation>> GetAllCompletedInvitationsAsync();
        Task<IEnumerable<CompletedInvitation>> GetCompletedInvitationsByUserAsync(uint userId);

        Task<CompletedInvitation> CreateCompletedInvitationAsync(CompletedInvitation invitation);
        Task<bool> DeleteCompletedInvitationAsync(uint id);
    }
}
