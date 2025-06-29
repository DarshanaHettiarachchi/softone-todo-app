namespace TodoApp.Infrastructure.Authentication;
public sealed record LoginDto
{
    public string email { get; init; }
    public string Password { get; init; }
}
