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
            //new Claim(ClaimTypes.Role, user.Roles),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            if (user.Roles != null)
            {
                claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.RoleName)));
            }
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


