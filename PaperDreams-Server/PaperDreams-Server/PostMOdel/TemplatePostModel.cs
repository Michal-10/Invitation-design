using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TemplatePostModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public IFormFile Image { get; set; } // ✅ קובץ תמונה להעלאה

        //public string ImageUrl { get; set; }
        [Required]
        public string Category { get; set; }
    }

}
