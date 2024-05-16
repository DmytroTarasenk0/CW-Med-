using CW.Client;
using CW;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using CW.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PatientContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("PatientDatabase")));

builder.Services.AddSingleton<IssueInfoClient>(serviceProvider =>
{
    var address = Constants.Address;
    var apiKey = Constants.Key;
    return new IssueInfoClient(address, apiKey);
});

builder.Services.AddSingleton<SymptomClient>(serviceProvider =>
{
    var address = Constants.Address;
    var apiKey = Constants.Key;
    return new SymptomClient(address, apiKey);
});

builder.Services.AddSingleton<DiagnosisClient>(serviceProvider =>
{
    var address = Constants.Address;
    var apiKey = Constants.Key;
    return new DiagnosisClient(address, apiKey);
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var options = new DefaultFilesOptions();
options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("default.html");
app.UseDefaultFiles(options);

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();