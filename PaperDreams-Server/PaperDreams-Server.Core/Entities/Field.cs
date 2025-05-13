using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class Field
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TemplateField> TemplateFields { get; set; }

        // public ICollection<CategoryField> CategoryFields { get; set; }

    }
}
