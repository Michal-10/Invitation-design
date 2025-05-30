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
            listUsers.ForEach(u=> Console.WriteLine(u));
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
                            <div dir='rtl' style='font-family:Arial,sans-serif; font-size:14px; color:#333;'>
                                <p>{content}</p>
                                <hr style='margin:20px 0;' />
                                <div style='color: #555;'>
                                    <p style='margin:0; font-weight:bold;'>🎉 InvitationLine – <span style='font-style:italic;'>כי כל פרט חשוב</span></p>
                                    <p style='margin:4px 0;'>🎨 עיצוב חכם להזמנות, תבניות מותאמות אישית ועוד</p>
                                    <p style='margin:4px 0;'>🌐 
                                        <a href='https://invitationline.onrender.com' style='color:#0066cc; text-decoration:none;'>www.invitationline.com</a>
                                    </p>
                                    <p style='margin:4px 0;'>📧 
                                        <a href='mailto:noreply.invitationline@gmail.com?subject=פנייה%20לשירות%20לקוחות&body=שלום%20צוות%20InvitationLine%2C%0A%0Aברצוני%20לפנות%20אליכם%20בעניין%20...' 
                                           style='color:#0066cc; text-decoration:none;'>support@invitationline.co.il</a>
                                    </p>
                                    <p style='margin:4px 0;'>📞 +1 (234) 567-8900</p>
                                    <p style='margin-top:10px; font-size:12px; color:#888;'>
                                        הודעה זו נשלחה מ־InvitationLine. נשמח לסייע בכל שאלה או פנייה.
                                    </p>
                                </div>
                            </div>",


                        IsBodyHtml = true
                    };

                    mail.Bcc.Add(fromEmail);
                    mail.To.Add(recipient);
                    Console.WriteLine("yes "+recipient);
                    await smtpClient.SendMailAsync(mail);
                    Console.WriteLine($"Successfully sent to: {recipient}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send to {recipient}. Error: {ex.Message}");
                    // אפשר להמשיך לשולח את השאר גם אם אחד נפל
                }
            }

            return Ok(new { message = "הודעות נשלחו בהצלחה" });
        }

    }
}
