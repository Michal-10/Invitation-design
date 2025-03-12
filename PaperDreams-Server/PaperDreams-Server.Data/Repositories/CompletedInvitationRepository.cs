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

        // קבלת כל ההזמנות
        public async Task<IEnumerable<CompletedInvitation>> GetAllCompletedInvitationsAsync()
        {
            return await _context.CompletedInvitations.ToListAsync();
        }

        // קבלת כל ההזמנות לפי משתמש
        public async Task<IEnumerable<CompletedInvitation>> GetCompletedInvitationsByUserAsync(uint userId)
        {
            return await _context.CompletedInvitations.Where(i => i.UserId == userId).ToListAsync();
        }

        // קבלת כל ההזמנות לפי קטגוריה
        public async Task<IEnumerable<CompletedInvitation>> GetCompletedInvitationsByCategoryAsync(uint category)
        {
            return await _context.CompletedInvitations.Where(i => i.Category == category).ToListAsync();
        }


        // הוספת הזמנה חדשה
        public async Task<CompletedInvitation> CreateCompletedInvitationAsync(CompletedInvitation invitation)
        {
            _context.CompletedInvitations.Add(invitation);
            await _context.SaveChangesAsync();
            return invitation;
        }

        // מחיקת הזמנה
        public async Task<bool> DeleteCompletedInvitationAsync(uint id)
        {
            var invitation = await _context.CompletedInvitations.FindAsync(id);
            if (invitation == null) return false;

            _context.CompletedInvitations.Remove(invitation);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}
