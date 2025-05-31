using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.DTOs
{
    public class StatisticDto
    {
        public DateTime Date { get; set; }
        public string CategoryName { get; set; }
        public int Count { get; set; }
    }
}
