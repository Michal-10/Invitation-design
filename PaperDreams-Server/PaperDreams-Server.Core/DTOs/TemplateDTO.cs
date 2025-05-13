using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class TemplateDTO
    {
        //public int Id { get; set; }
        //public string Name { get; set; }
        //public string Description { get; set; }
        //public string ImageUrl { get; set; }
        //public int Category { get; set; }

        //public DateTime CreatedAt { get; set; }
        //public DateTime UpdatedAt { get; set; }

        ///*--------------------------------*/
        //public int UserId { get; set; }  
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UserId { get; set; }

        // ✅ נוסיף את רשימת השדות של התבנית
        public List<TemplateFieldDTO> TemplateFields { get; set; }
    }
 
}
