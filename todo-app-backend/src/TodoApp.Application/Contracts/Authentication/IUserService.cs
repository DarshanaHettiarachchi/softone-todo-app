using TodoApp.Application.Models;

namespace TodoApp.Application.Contracts.Authentication;
public interface IUserService
{
    Task<bool> ValidateCredentialsAsync(string email, string password);
    Task RegisterAsync(RegisterUserDto dto);
    interface IUserService
    {
        Task<bool> ValidateCredentialsAsync(string email, string password);
        Task RegisterAsync(RegisterUserDto dto);
    }
}

