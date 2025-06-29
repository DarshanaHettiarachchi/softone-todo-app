namespace TodoApp.Application.Contracts.Authorization;
public interface IResourceAuthorizationService
{
    void EnsureUserOwnsResource(int resourceOwnerId);
}
