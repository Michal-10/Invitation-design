using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace PaperDreams_Server.Core.Entities
{
    public class Permissions
    {
        public int Id { get; set; }
        public string PermissionName { get; set; } //(לדוגמה: 'Files.Create', 'Users.Delete')
        public string Description { get; set; }

        public ICollection<Role> Roles { get; set; }
    }
}
