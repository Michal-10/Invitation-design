using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Core.IRpositories
{
    public interface ITextUploadRepository
    {
        Task<TextUpload> AddTextUploadAsync(TextUpload textUpload);
        Task<TextUpload> GetTextUploadByIdAsync(uint id);
        Task<IEnumerable<TextUpload>> GetTextUploadsByUserIdAsync(uint userId);
        Task<TextUpload> UpdateTextUploadAsync(TextUpload textUpload);

        Task<bool> DeleteTextUploadAsync(uint id);
    }
}
