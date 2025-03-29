using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class CompletedInvitationDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Category { get; set; }
        public string Name { get; set; }

        public string ImageUrl { get; set; }
        public int TemplateId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
