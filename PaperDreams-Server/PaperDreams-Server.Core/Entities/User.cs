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
        public uint Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime created_at { get; set; }
        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }
}
