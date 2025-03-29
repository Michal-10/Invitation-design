using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Runtime.CredentialManagement;

namespace PaperDreams_Server.Controllers
{

    [ApiController]
    [Route("api/upload")]
    public class AWSFiles : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName = "designinvitations-dataimage"; // עדכני את שם ה-Bucket שלך
        private readonly HashSet<string> _allowedContentTypes = new HashSet<string>
        {
            "image/jpeg",
            "image/jpg",
            "image/png",
            "application/pdf"
        };

        public AWSFiles(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.PUT, // מאפשר העלאה
                Expires = DateTime.UtcNow.AddMinutes(5),
                // = "image/jpeg" // או סוג הקובץ המתאים
                ContentType = GetContentType(fileName)
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok( url );
        }

        private string GetContentType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLower();
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".pdf" => "application/pdf",
                ".docx" => "image/word",
                _ => ""
            };
        }

        [HttpGet("download-url/{fileName}")]
        public async Task<string> GetDownloadUrlAsync(string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(60) // תוקף של 30 דקות
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
