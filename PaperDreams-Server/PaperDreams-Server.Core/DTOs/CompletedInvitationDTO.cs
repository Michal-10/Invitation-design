﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class CompletedInvitationDTO
    {
        public uint Id { get; set; }
        public uint UserId { get; set; }
        public string EventType { get; set; }
        public string ImageUrl { get; set; }

        public int TemplateId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
