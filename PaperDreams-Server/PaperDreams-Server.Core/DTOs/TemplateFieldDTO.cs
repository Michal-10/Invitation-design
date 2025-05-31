using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class TemplateFieldDTO
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public FieldDTO Field { get; set; }
        public int FieldId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }

    
}
