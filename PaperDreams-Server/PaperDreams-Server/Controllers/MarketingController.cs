using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using PaperDreams_Server.PostMOdel;
using PaperDreams_Server.Core.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PaperDreams_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketingController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;

        public MarketingController(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMarketingEmail([FromBody] string content)
        {
            var listUsers = _userService.GetEmailUsersAsync().Result;
            Console.WriteLine(listUsers);
            if (listUsers == null || !(listUsers.Any() || string.IsNullOrEmpty(content))) 
                return BadRequest("Missing emails or content");

            var fromEmail = _config["Email:User"];
            var password = _config["Email:Password"];

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = true,
            };

            foreach (var recipient in listUsers)
            {
                try
                {
                    var mail = new MailMessage
                    {
                        From = new MailAddress(fromEmail, "הזמנות אונליין"),
                        Subject = "מייל שיווקי עבורך",
                        Body = $@"
                    <div dir='rtl'>
                        <p>
                            {content}
                          </p>
                        <hr style='margin:20px 0;' />
                        <div style='color: #555;'>
                            <p style='margin:0;'>בברכה,<br />צוות invitatioline</p>
                        </div>
                    </div>",
                        IsBodyHtml = true
                    };

                   // mail.Bcc.Add(fromEmail);
                    mail.To.Add(recipient);

                    await smtpClient.SendMailAsync(mail);
                }
                catch (Exception ex)
                {
                    //Console.WriteLine($"שגיאה בשליחת מייל ל: {recipient}, שגיאה: {ex.Message}");
                    // אפשר להמשיך לשולח את השאר גם אם אחד נפל
                }
            }

            return Ok(new { message = "הודעות נשלחו בהצלחה" });
        }

    }
}
