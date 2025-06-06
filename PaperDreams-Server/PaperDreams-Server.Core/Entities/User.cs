﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }


        [Required]
        public string Email { get; set; }

        [StringLength(128, MinimumLength = 128)]
        public string PasswordHash { get; set; }
        
        public string? FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public DateTime created_at { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        public ICollection<Role> Roles { get; set; } = new List<Role>();

    }
}
