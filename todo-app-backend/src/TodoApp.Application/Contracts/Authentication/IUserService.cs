using TodoApp.Application.Models;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Contracts.Authentication;
public interface IUserService
{
    Task<bool> ValidateCredentialsAsync(string email, string password);
    Task RegisterAsync(RegisterUserDto dto);
    Task<User?> GetUserAsync(string email, string password);

}

