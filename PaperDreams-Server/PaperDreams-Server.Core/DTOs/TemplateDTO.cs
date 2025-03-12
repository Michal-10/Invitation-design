using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class TemplateDTO
    {
        public uint Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
    }
 
}
