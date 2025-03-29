using PaperDreams_Server.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PaperDreams_Server.PostMOdel
{
    public class CategoryPostModel
    {
        public string? Name { get; set; }
        public int UserId { get; set; } 
        public string Description { get; set; }


    }
}
