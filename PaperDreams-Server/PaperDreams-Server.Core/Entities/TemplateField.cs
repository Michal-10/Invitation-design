using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{

    public class TemplateField
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey(nameof(Template))]
        public int TemplateId { get; set; }
        public Template Template { get; set; }

        [Required]
        [ForeignKey(nameof(Field))]
        public int FieldId { get; set; }
        public Field Field { get; set; }

        public int X { get; set; } 
        public int Y { get; set; } 
        
    }
}
