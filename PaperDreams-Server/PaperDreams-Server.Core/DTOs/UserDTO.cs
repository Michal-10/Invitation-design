using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime created_at { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }
}
