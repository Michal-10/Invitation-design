using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TextUploadPostModel
    {
        [Required]
        public uint UserId { get; set; }        // מזהה המשתמש
        [Required]    
        public IFormFile File { get; set; }    // קובץ הטקסט המועלה
    }
}
