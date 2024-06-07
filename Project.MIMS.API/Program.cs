
using Microsoft.AspNetCore.Connections;
using Project.Core.Data;
using Project.MIMS.API.Extensions;
using Project.MIMS.Core;
using Project.MIMS.Dapper;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
var ConName = configuration.GetValue<string>("name");


// Add services to the container.
builder.Services.AddTransient<IMIMSUnitOfWork, MIMSUnitOfWork>(ctx =>
{
    IMIMSConnectionFactory connectionFactory = new MIMSConnectionFactory(configuration.GetConnectionString("SqlConnectionString"));
    return new MIMSUnitOfWork(connectionFactory);
});
builder.Services.AddApplicationServices();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
StripeConfiguration.ApiKey = "sk_test_26PHem9AhJZvU623DfE1x4sd";

var app = builder.Build();
string ReactWebServerUrl = configuration["AppSettings:ClientDomain"];
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
                builder.WithOrigins(ReactWebServerUrl).AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
