using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class CategoryField
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }
        public CategoryDto Category { get; set; }

        public int FieldId { get; set; }
        public Field Field { get; set; }
    }
}
