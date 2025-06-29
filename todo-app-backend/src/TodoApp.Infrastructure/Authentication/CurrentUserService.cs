using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using TodoApp.Application.Contracts.Authentication;

namespace TodoApp.Infrastructure.Authentication;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int? UserId
    {
        get
        {
            var userIdStr = _httpContextAccessor.HttpContext?.User?
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return int.TryParse(userIdStr, out var id) ? id : null;
        }
    }
}
