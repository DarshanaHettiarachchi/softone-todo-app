using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Contracts.Authentication;
using TodoApp.Application.Models;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Persistence;

namespace TodoApp.Infrastructure.Authentication;
public class UserService : IUserService
{
    private readonly TodoDbContext _dbContext;

    public UserService(TodoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task RegisterAsync(RegisterUserDto dto)
    {
        if (await _dbContext.Users.AnyAsync(u => u.Email == dto.Email))
        {
            throw new Exception("User already exists.");
        }

        var passwordHash = HashPassword(dto.Password);

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = passwordHash
        };

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> ValidateCredentialsAsync(string email, string password)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            return false;
        }

        return VerifyPassword(password, user.PasswordHash);
    }

    private string HashPassword(string password)
    {
        var bytes = Encoding.UTF8.GetBytes(password);
        var hashBytes = SHA256.HashData(bytes);
        return Convert.ToBase64String(hashBytes);
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        return HashPassword(password) == storedHash;
    }
}
