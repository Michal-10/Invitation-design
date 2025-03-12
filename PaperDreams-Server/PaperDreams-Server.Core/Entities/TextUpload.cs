using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class TextUpload
    {
        [Key]
        public uint Id { get; set; }              // מזהה ייחודי

        [ForeignKey(nameof(UserId))]
        public uint UserId { get; set; }          // מזהה המשתמש המעלה את הקובץ
        public User User { get; set; }

        [Required]
        public string FileUrl { get; set; }      // כתובת הקובץ (במקרה הזה, הנתיב המקומי)
        
        public DateTime CreatedAt { get; set; }  // תאריך יצירת הרשומה
        
        public DateTime UpdatedAt { get; set; }  // תאריך עדכון הרשומה
    }
}
