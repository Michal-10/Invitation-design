using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TemplatePostModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; } // ✅ קובץ תמונה להעלאה

        //public string ImageUrl { get; set; }
        [Required]
        public int Category { get; set; }
    }

}
