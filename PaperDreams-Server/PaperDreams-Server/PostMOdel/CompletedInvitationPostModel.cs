using System.ComponentModel.DataAnnotations;

namespace PaperDreams_Server.PostMOdel
{
    public class CompletedInvitationPostModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string EventType { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public int TemplateId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
