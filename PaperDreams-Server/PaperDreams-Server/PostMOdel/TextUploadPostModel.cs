using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class TextUploadPostModel
    {
        [Required]
        public int UserId { get; set; }        // מזהה המשתמש
        [Required]    
        public string File { get; set; }    // קובץ הטקסט המועלה
    }
}
