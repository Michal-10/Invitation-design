using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class CompletedInvitation
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public User User { get; set; }


        [ForeignKey(nameof(TemplateId))]
        public int TemplateId { get; set; }
        public Template Template { get; set; }  // קשר לתבנית שנבחרה להזמנה


        public string ImageUrl { get; set; }

        //public int EventType { get; set; }

        public string Content { get; set; }
        public int Category { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

}
