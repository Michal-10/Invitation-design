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
    public class JwtService : IJwtService
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
            // מוודא כי ה-User לא null
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var claims = new List<Claim>
                {
                    //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // שימוש ב-ClaimTypes.NameIdentifier
                    //new Claim("userId", user.Id.ToString()), // הוספת ה-Claim הזה כדי להימנע מבעיה
                    //new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    //new Claim(ClaimTypes.Name, user.FirstName ?? ""),
                    //new Claim("name", user.FirstName ?? user.LastName ?? ""),
                    //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())

                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim("userId", user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("email", user.Email),
                    new Claim("firstName", user.FirstName ?? ""),
                    new Claim("lastName", user.LastName ?? ""),
                    new Claim("created_at", user.created_at.ToString("o")), // בפורמט ISO
                    new Claim("updatedAt", user.UpdatedAt.ToString("o")),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim("roles", role.RoleName)); // הוספת תפקיד כ-Claim
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //  זמן תפוגה 2 שעות
            var expiration = DateTime.UtcNow.AddHours(2);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}


