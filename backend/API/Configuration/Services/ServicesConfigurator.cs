using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Configuration.Services
{
    public class ServicesConfigurator : IServicesConfigurator
    {
        public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
            // services.AddControllers(options =>
            // {
            //     var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            //     options.Filters.Add(new AuthorizeFilter(policy));
            // }).AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<Create>());

            services.AddDbContext<DatabaseContext>(ob => ob.UseNpgsql(configuration.GetConnectionString("DatabaseConnection")));

            services.AddCors(options => options.AddPolicy(
                "CorsPolicy",
                policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"))
            );

            // services.AddMediatR(typeof(GetAll.Handler).Assembly);

            // var builder = services.AddIdentityCore<AppUser>();
            // var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            // identityBuilder.AddEntityFrameworkStores<DatabaseContext>();
            // identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //     .AddJwtBearer(options =>
            //     {
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             ValidateIssuerSigningKey = true,
            //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])),
            //             ValidateAudience = false,
            //             ValidateIssuer = false
            //         };
            //     });

            // services.AddScoped<IJWTGenerator, JWTGenerator>();
        }
    }
}