using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class CompletedInvitationPostModel
    {
        [Required]
        public int Category { get; set; }
        [Required]
        public string Name { get; set; }


        [Required]
        public string ImageUrl { get; set; }
        public int UserId { get; set; }
        [Required]

        public int TemplateId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
