using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class TextUploadDTO
    {
        public int UserId { get; set; }        // מזהה המשתמש
        public string File { get; set; }    // קובץ הטקסט המועלה
        public DateTime CreatedAt { get; set; }  // תאריך יצירת הרשומה

    }
}
