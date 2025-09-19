var builder = WebApplication.CreateBuilder(args);

// Adiciona controllers
builder.Services.AddControllers();

// Configura CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // endereço do front
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger (somente em dev)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Desative HTTPS redirection em dev (evita problema de certificado)
// app.UseHttpsRedirection();

app.UseRouting();            // ✅ precisa estar aqui

app.UseCors("AllowReact");   // ✅ vem depois de UseRouting()

app.UseAuthorization();

app.MapControllers();

app.Run();
