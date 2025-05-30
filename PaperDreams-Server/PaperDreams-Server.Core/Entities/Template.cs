using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.Entities
{
    public class Template
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [Required]
        public string ImageUrl { get; set; } 
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Description { get; set; }

        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }         
        public User User { get; set; }


        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }         
        public CategoryDto Category { get; set; }

        public ICollection<TemplateField> TemplateFields { get; set; }

    }
}
