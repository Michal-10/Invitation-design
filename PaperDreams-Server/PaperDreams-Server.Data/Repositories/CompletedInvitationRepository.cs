using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data.Repositories
{
    public class CompletedInvitationRepository : ICompletedInvitationRepository
    {
        private readonly DataContext _context;

        public CompletedInvitationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CompletedInvitation>> GetAllCompletedInvitationsAsync()
        {
            return await _context.CompletedInvitations.ToListAsync();
        }

        public async Task<IEnumerable<CompletedInvitation>> GetCompletedInvitationsByUserAsync(int userId)
        {
            return await _context.CompletedInvitations.Where(i => i.UserId == userId).ToListAsync();
        }

        public async Task<bool> CreateCompletedInvitationAsync(CompletedInvitation invitation)
        {
            _context.CompletedInvitations.Add(invitation);
            return await _context.SaveChangesAsync()>0;
             
        }
    }
}
