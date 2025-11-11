using Book_api.Models;
using Book_api.Data;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Cryptography;

namespace Book_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController(IConfiguration configuration, ApplicationDbContext context) : ControllerBase
{
    // Post: api/User/Register
    [HttpPost("Register")]
    public async Task<ActionResult<string?>> Register(User newUser)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.name == newUser.name);

        /* Make sure usernames are unique */
        if (user is not null) return BadRequest("Username already taken");

        if (newUser.name.Length > 20) return BadRequest("Username too long (max 20)");

        /* Hash the password and save the new user */
        user = new()
        {
            name = newUser.name,
            password = Hash(newUser.password)
        };

        await context.AddAsync(user);
        await context.SaveChangesAsync();

        return Ok();
    }

    // Post: api/User
    [HttpPost]
    public async Task<ActionResult<string?>> Login(User user)
    {
        var realUser = await context.Users.FirstOrDefaultAsync(u => u.name == user.name);

        if (realUser is null) return BadRequest("No such user");

        if (realUser.password == Hash(user.password))
        {
            return Ok(new { Token = GenerateJwtToken(user.name) }); //Return a json object containing the token
        }
        return Unauthorized();
    }

    /* Generate a token based on username, which is valid for 120 minutes */
    private string GenerateJwtToken(string Username)
    {
        var claims = new[]{
            new Claim(JwtRegisteredClaimNames.Sub, Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

        string skey = configuration["signingKey"] ?? throw new Exception("Key needs to be set in appsettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(skey));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["validIssuer"],
            audience: configuration["validAudience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string Hash(string plainText)
    {
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(plainText));
        return BitConverter.ToString(hash);
    }
}