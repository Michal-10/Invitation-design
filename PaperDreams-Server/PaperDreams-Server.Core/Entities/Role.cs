using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace PaperDreams_Server.Core.Entities
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        
        public string RoleName { get; set; } //(לדוגמה: Admin, Editor, User)
        
        public string Description { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        public ICollection<User> Users { get; set; }
        
        public ICollection<Permissions> Roles { get; set; }

    }
}
