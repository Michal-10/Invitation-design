using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TextUploadPostModel
    {
        [Required]
        public int UserId { get; set; }        // מזהה המשתמש
        [Required]    
        public string FileUrl { get; set; }    // קובץ הטקסט המועלה
        [Required]
        public string Name { get; set; }
    }
}
