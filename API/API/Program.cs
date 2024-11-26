using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PATCH: http://localhost:5273/api/tarefa/alterar/{id}
app.MapPatch("/api/tarefa/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = ctx.Tarefas.FirstOrDefault(t => t.TarefaId.ToString() == id);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    if (tarefa.Status == "Não iniciada" || tarefa.Status == "Em andamento")
    {
        tarefa.Status = tarefa.Status == "Em andamento" ? "Concluído" : "Em andamento";
        ctx.SaveChanges();
        return Results.Ok(tarefa);
    }

    return Results.BadRequest("Status atual da tarefa não pode ser alterado.");
});

// GET: http://localhost:5273/api/tarefa/naoconcluidas
app.MapGet("/api/tarefa/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = ctx.Tarefas
        .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
        .Include(t => t.Categoria)
        .ToList();

    return Results.Ok(tarefasNaoConcluidas);
});

// GET: http://localhost:5273/api/tarefa/concluidas
app.MapGet("/api/tarefa/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasConcluidas = ctx.Tarefas
        .Where(t => t.Status == "Concluído")
        .Include(t => t.Categoria)
        .ToList();

    return Results.Ok(tarefasConcluidas);
});

app.Run();
