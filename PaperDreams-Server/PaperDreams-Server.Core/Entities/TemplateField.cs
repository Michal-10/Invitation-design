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
        //public string FieldName { get; set; } // שם השדה ("שם החתן", "שם הכלה", "שעה" וכו')
        [ForeignKey(nameof(Field))]
        public int FieldId { get; set; }
        public Field Field { get; set; }

        public int X { get; set; } // מיקום אופקי
        public int Y { get; set; } // מיקום אנכי
        
    }
}
