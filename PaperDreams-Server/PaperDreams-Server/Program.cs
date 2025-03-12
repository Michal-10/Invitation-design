//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using PaperDreams_Server;
//using PaperDreams_Server.Core;
//using PaperDreams_Server.Core.IRpositories;
//using PaperDreams_Server.Core.Iservices;
//using PaperDreams_Server.Data;
//using PaperDreams_Server.Data.Repositories;
//using PaperDreams_Server.Service.services;
//using System.Text;
//using System.Text.Json.Serialization;

//var builder = WebApplication.CreateBuilder(args);
//////התעלמות מהפניה מעגלית 
////builder.Services.AddControllers().AddJsonOptions(options =>
////{
////   options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
////   options.JsonSerializerOptions.WriteIndented = true;
////});

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
////builder.Services.AddSwaggerGen();


//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

//    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Description = "JWT Authorization header using the Bearer scheme.",
//        Type = SecuritySchemeType.Http,
//        Scheme = "bearer"
//    });

//    c.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                }
//            },
//            new string[] {}
//        }
//    });
//});



///*---------------------DataContext------------------*/
//builder.Services.AddDbContext<DataContext>();
////builder.Services.AddDbContext<DataContext>(options =>
////options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

////builder.Services.AddSingleton<DataContext>();


///*---------------------Irepository-------------------*/
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<ITemplateRepository, TemplateRepository>();
//builder.Services.AddScoped<ITextUploadRepository, TextUploadRepository>();

///*---------------------AutoMapper--------------------*/
//builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelMappingProfile));

///*--------Service-------------*/
//builder.Services.AddSingleton<IJwtService, JwtService>();
//builder.Services.AddScoped<ITemplateService, TemplateService>();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<ITextUploadService, TextUploadService>();


//builder.Services.AddCors();




//// הוספת JWT Authentication
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
//        };
//    });

//// הוספת הרשאות מבוססות-תפקידים
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
//    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
//    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
//});





//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();


//app.UseAuthorization();

//app.MapControllers();

//app.Run();



using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
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
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddScoped<ITextUploadRepository, TextUploadRepository>();

// הוספת AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelMappingProfile));

// הוספת Services
builder.Services.AddSingleton<IJwtService, JwtService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITextUploadService, TextUploadService>();

// הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001") // הוספת גם את 3001
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

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
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

// קריאה ל-CORS לפני Authentication ו-Authorization
app.UseCors("AllowReactApp");

app.UseAuthentication(); // 🔑 הוספתי את זה כאן!
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Server is running");
app.Run();

