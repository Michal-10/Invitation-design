using PaperDreams_Server.Core.DTOs;
using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TemplatePostModel
    {
        //[Required]
        //public string Name { get; set; }
        //[Required]
        //public string Description { get; set; }

        //[Required]
        //public string ImageUrl { get; set; } // ✅ קובץ תמונה להעלאה

        ////public string ImageUrl { get; set; }
        //[Required]
        //public int Category { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public int CategoryId { get; set; }

        // ✅ נוסיף את רשימת השדות של התבנית
        public List<TemplateFieldDTO> Fields { get; set; }
    }

}
