using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.PostMOdel;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Net.Mime;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompletedInvitationController : ControllerBase
    {
        private readonly ICompletedInvitationService _completedInvitationService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;


        public CompletedInvitationController(ICompletedInvitationService completedInvitationService, IMapper mapper, IConfiguration config)
        {
            _completedInvitationService = completedInvitationService;
            _mapper = mapper;
            _config = config;
        }

        // הוספת הזמנה חדשה
        [HttpPost("add")]
        public async Task<IActionResult> CreateCompletedInvitation([FromBody] CompletedInvitationPostModel model)
        {
            // המרת המודל ל-DTO
            var completedInvitationDTO = _mapper.Map<CompletedInvitationDTO>(model);
            var createdInvitation = await _completedInvitationService.CreateCompletedInvitationAsync(completedInvitationDTO);

            if (!createdInvitation)
            {
                return BadRequest("Failed to create invitation.");
            }

            return Ok(createdInvitation);
        }

        // קבלת כל ההזמנות
        [HttpGet]
        public async Task<IActionResult> GetCompletedInvitations()
        {
            var invitations = await _completedInvitationService.GetAllCompletedInvitationsAsync();
            return Ok(invitations);
        }

        // קבלת כל ההזמנות לפי משתמש
        [HttpGet("userInvitation/{userId}")]
        // [Authorize]
        public async Task<IActionResult> GetCompletedInvitationsByUser(int userId)
        {
            //var userIdClaim = User?.Claims?.FirstOrDefault(c => c.Type == "userId");
            //if (userIdClaim == null)
            //{
            //    return Unauthorized("User ID not found in token.");
            //}

            //int userId = int.Parse(userIdClaim.Value);

            var invitations = await _completedInvitationService.GetCompletedInvitationsByUserAsync(userId);
            if (invitations == null || !invitations.Any())
            {
                return NotFound("No invitations found for this user.");
            }
            return Ok(invitations);
        }

        // קבלת כל ההזמנות המושלמות לפי קטגוריה
        [HttpGet("user/{category}")]
        public async Task<IActionResult> GetCompletedInvitationsByCategory(int category)
        {
            var invitations = await _completedInvitationService.GetAllCompletedInvitationsByCategoryAsync(category);
            if (invitations == null || !invitations.Any())
            {
                return NotFound("No invitations found for this user.");
            }
            return Ok(invitations);
        }

        // מחיקת הזמנה
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompletedInvitation(int id)
        {
            var success = await _completedInvitationService.DeleteCompletedInvitationAsync(id);
            if (!success)
            {
                return NotFound("Completed invitation not found.");
            }
            return NoContent();
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendInvitationAsync([FromBody] SendInvitation request)
        {
            {
                if (string.IsNullOrEmpty(request.To) || string.IsNullOrEmpty(request.ImageUrl))
                    return BadRequest("Missing required fields");

                // 🔍 בדיקת אימייל לפני שליחה
                if (!await IsEmailValid(request.To))
                    return BadRequest("כתובת האימייל לא קיימת");

                try
                {
                    var fromEmail = _config["Email:User"];
                    var password = _config["Email:Password"];

                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential(fromEmail, password),
                        EnableSsl = true,
                    };

                    var mail = new MailMessage
                    {
                        From = new MailAddress(fromEmail, "הזמנות אונליין"),
                        Subject = "הזמנה אישית עבורך ",
                        IsBodyHtml = true,
                    };

                    mail.To.Add(request.To);

                    // שלב 1: הורדת התמונה
                    using var webClient = new WebClient();
                    byte[] imageData = webClient.DownloadData(request.ImageUrl);
                    var imageStream = new MemoryStream(imageData);

                    // שלב 2: הוספה כקובץ מצורף עם CID
                    var inline = new Attachment(imageStream, "invitation.jpg")
                    {
                        ContentId = "invitationImage",
                        ContentDisposition = { Inline = true, DispositionType = DispositionTypeNames.Inline },
                        ContentType = new System.Net.Mime.ContentType("image/jpeg")
                    };
                    mail.Attachments.Add(inline);

                    // שלב 3: HTML עם הפניה לתמונה לפי CID
                    mail.Body = $@"
                        <div dir='rtl'>
                            <p>{request.Message}</p>
                            <img src='cid:invitationImage' style='max-width:100%;' />
                             <hr style='margin:20px 0;' />

                            <div style='color: #555;'>
                                <p style='margin:0; '>בברכה,<br />צוות invitatioline</p>
                                <p style='margin:0;'>
                                    <a href='https://yourwebsite.com' target='_blank' style='color: #1a73e8; text-decoration: none;'>לאתר שלנו</a>
                                </p>
                            </div>
                        </div>";

                    mail.Bcc.Add(fromEmail);
                    smtpClient.Send(mail);

                    return Ok(new { success = true });
                }
                catch (SmtpFailedRecipientException smtpEx)
                {
                    return StatusCode(400, $"כתובת לא קיימת: {smtpEx.FailedRecipient}");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Failed to send: {ex.Message}");
                }
            }

        }

        private async Task<bool> IsEmailValid(string email)
        {
            var apiKey = _config["MailboxLayer:ApiKey"]; // ודאי שיש מפתח בקובץ appsettings
            var url = $"http://apilayer.net/api/check?access_key={apiKey}&email={email}&smtp=1&format=1";

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return false;

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);

            // בדיקת השדה smtp_check
            return json.RootElement.TryGetProperty("smtp_check", out var smtpCheck) && smtpCheck.GetBoolean();
        }
    }
}
