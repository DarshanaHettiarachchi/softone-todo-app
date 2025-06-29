using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Contracts.Authentication;
using TodoApp.Application.Models;
using TodoApp.Infrastructure.Authentication;

namespace TodoApp.Api.Controllers;
[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        try
        {
            await _userService.RegisterAsync(dto);
            return Ok(new { message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    //Not sending password over plain http
    //Just for the demo
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
    {

        if (!await _userService.ValidateCredentialsAsync(loginDto.email, loginDto.Password))
        {
            return Unauthorized(new { error = "Invalid email or password" });
        }

        string email = loginDto.email;

        return Ok(new
        {
            email,
        });
    }
}
