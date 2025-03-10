using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PaperDreams_Server.Core.DTOs;
using PaperDreams_Server.Core.Entities;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class JwtService : IJwtService //יצירת JWT Token
    {
        //private readonly string _secret;
        //private readonly string _issuer;
        //private readonly string _audience;
        //private readonly int _expirationInMinutes;

        //public JwtService(IConfiguration configuration)
        //{
        //    _secret = configuration["JwtSettings:Secret"];
        //    _issuer = configuration["JwtSettings:Issuer"];
        //    _audience = configuration["JwtSettings:Audience"];
        //    _expirationInMinutes = int.Parse(configuration["JwtSettings:ExpirationInMinutes"]);
        //}

        //public string GenerateToken(User user)
        //{
        //    var claims = new List<Claim>
        //{
        //    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        //    new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //    new Claim(ClaimTypes.Name, user.FirstName ?? ""),
        //    new Claim(ClaimTypes.Role, user.Role), // מוסיף את התפקיד
        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //};

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        _issuer,
        //        _audience,
        //        claims,
        //        expires: DateTime.UtcNow.AddMinutes(_expirationInMinutes),
        //        signingCredentials: creds);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}











        //private readonly IConfiguration _configuration;

        //public JwtService(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //}

        //public string GenerateJwtToken(string username, string[] roles)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new List<Claim>
        //{
        //    new Claim(ClaimTypes.Name, username)
        //};

        //    // הוספת תפקידים כ-Claims
        //    foreach (var role in roles)
        //    {
        //        claims.Add(new Claim(ClaimTypes.Role, role));
        //    }

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["Jwt:Issuer"],
        //        audience: _configuration["Jwt:Audience"],
        //        claims: claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: credentials
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}


        //private readonly string _secret;
        //private readonly string _issuer;
        //private readonly string _audience;
        ////private readonly int _expirationInMinutes;

        //public JwtService(IConfiguration configuration)
        //{
        //    _secret = configuration["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret is missing");
        //    _issuer = configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer is missing");
        //    _audience = configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience is missing");

        //    //var expirationString = configuration["Jwt:ExpirationInMinutes"];
        //    //if (!string.IsNullOrEmpty(expirationString) && int.TryParse(expirationString, out int expirationMinutes))
        //    //{
        //    //    _expirationInMinutes = expirationMinutes;
        //    //}
        //    //else
        //    //{
        //    //    _expirationInMinutes = 60; // ערך ברירת מחדל: שעה אחת
        //    //}
        //}

        //public string GenerateToken(User user)
        //{
        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //        new Claim(ClaimTypes.Name, user.FirstName ?? ""),
        //        new Claim(ClaimTypes.Role, user.Role),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        _issuer,
        //        _audience,
        //        claims,
        //        //expires: DateTime.UtcNow.AddMinutes(_expirationInMinutes),
        //        expires: DateTime.UtcNow.AddHours(2),
        //        signingCredentials: creds);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}


        private readonly string _secret;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtService(IConfiguration configuration)
        {
            _secret = configuration["Jwt:Secret"] ?? throw new ArgumentNullException("Jwt:Secret is missing");
            _issuer = configuration["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer is missing");
            _audience = configuration["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience is missing");
        }

        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FirstName ?? ""), // טיפול ב-null
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // הגדרת זמן תפוגה לשעתיים
            var expiration = DateTime.UtcNow.Add(TimeSpan.FromHours(2));

            var token = new JwtSecurityToken(
                _issuer,
                _audience,
                claims,
                expires: expiration,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}


