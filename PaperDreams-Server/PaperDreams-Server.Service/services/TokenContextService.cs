using Microsoft.AspNetCore.Http;
using PaperDreams_Server.Core.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Service.services
{
    public class TokenContextService : ITokenContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TokenContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int GetUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            var userIdClaim = user?.FindFirst(ClaimTypes.NameIdentifier);
            return int.TryParse(userIdClaim?.Value, out var userId) ? userId : 0;
        }
    }
    }


