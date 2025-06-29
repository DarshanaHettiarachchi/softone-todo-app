using TodoApp.Application.Contracts.Authentication;
using TodoApp.Application.Contracts.Authorization;
using TodoApp.Application.Exceptions;

namespace TodoApp.Application.Services;
public class ResourceAuthorizationService : IResourceAuthorizationService
{
    private readonly ICurrentUserService _currentUserService;

    public ResourceAuthorizationService(ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    public void EnsureUserOwnsResource(int resourceOwnerId)
    {
        var currentUserId = _currentUserService.UserId;

        if (!currentUserId.HasValue || currentUserId.Value != resourceOwnerId)
        {
            throw new ForbiddenAccessException();
        }
    }
}
