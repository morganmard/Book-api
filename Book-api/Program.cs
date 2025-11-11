using System.Text;
using Book_api.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Book_api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        /* Make sure a key is provided in appsettings.json */
        var key = builder.Configuration["signingKey"] ?? throw new Exception("Key needs to be set in appsettings");

        /* Make sure the key is long enough for sha256 hmac */
        if (key.Length < 31) throw new Exception("key too short");

        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite("Data Source=Data/app.db"));
        builder.Services.AddControllers();

        /* Configure JWT middle-ware */
        builder.Services.AddAuthentication().AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["validIssuer"],
                ValidAudience = builder.Configuration["validAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
            };
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        /* Cors-policies to allow all connections */
        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

        app.Run();
    }
}
