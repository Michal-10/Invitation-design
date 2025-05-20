
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PaperDreams_Server;
using PaperDreams_Server.Core;
using PaperDreams_Server.Core.IRpositories;
using PaperDreams_Server.Core.Iservices;
using PaperDreams_Server.Data;
using PaperDreams_Server.Data.Repositories;
using PaperDreams_Server.Service.services;
using System.Text;


DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);



var credentials = new BasicAWSCredentials(
    builder.Configuration["AWS:AccessKey"],
    builder.Configuration["AWS:SecretKey"]
);

var fromEmail = builder.Configuration["Email:User"];
var password = builder.Configuration["Email:Password"];
var apiKey = builder.Configuration["MailboxLayer:ApiKey"];

var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]); // בדקי שהאזור נכון

var s3Client = new AmazonS3Client(credentials, region);

builder.Services.AddSingleton<IAmazonS3>(s3Client);

// הוספת Controller
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// הוספת DataContext
builder.Services.AddDbContext<DataContext>();

// הוספת Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITemplateRepository, TemplateRepository>();
//builder.Services.AddScoped<ITextUploadRepository, TextUploadRepository>();
builder.Services.AddScoped<ICompletedInvitationRepository, CompletedInvitationRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryFieldRepository, CategoryFieldRepository>();
builder.Services.AddScoped<ITemplateFieldRepository, TemplateFieldRepository>();
builder.Services.AddScoped<IStatisticsRepository, StatisticsRepository>();

// הוספת AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelMappingProfile));

// הוספת Services
builder.Services.AddSingleton<IJwtService, JwtService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<ITextUploadService, TextUploadService>();
builder.Services.AddScoped<ICompletedInvitationService, CompletedInvitationService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryFieldService, CategoryFieldService>();
builder.Services.AddScoped<ITemplateFieldService, TemplateFieldService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();
builder.Services.AddScoped<ITokenContextService, TokenContextService>();
builder.Services.AddHttpContextAccessor();




//הגדרת CORS
builder.Services.AddCors(options =>
{
    //options.AddPolicy("AllowClients", policy =>
    //{

        //policy.SetIsOriginAllowed(_ => true)
        //.AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        options.AddPolicy("AllowClients", policy =>
        {
            policy.WithOrigins(
                    "https://invitationline.onrender.com",
                    "https://invitationline-admin.onrender.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod(). 
                  AllowCredentials(); // ✅ חשוב מאוד!
        });

    //});
});






//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowClients",
//        builder => builder.AllowAnyOrigin()
//                        .AllowAnyMethod()
//                        .AllowAnyHeader());
//});







// הוספת JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
        };
    });

// הוספת הרשאות מבוסס-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    //options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("User", policy => policy.RequireRole("User"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseCors("AllowClients");

app.UseAuthentication(); // 🔑 הוספתי את זה כאן!
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Server is running");
app.Run();

