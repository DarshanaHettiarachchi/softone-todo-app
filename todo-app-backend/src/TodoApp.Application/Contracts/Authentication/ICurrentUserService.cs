namespace TodoApp.Application.Contracts.Authentication;
public interface ICurrentUserService
{
    int? UserId { get; }
}
