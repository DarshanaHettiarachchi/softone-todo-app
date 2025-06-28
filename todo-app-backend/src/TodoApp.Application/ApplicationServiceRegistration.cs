using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Features.Todos.Commands.CreateTodo;
using TodoApp.Application.Features.Todos.Commands.UpdateTodo;
using TodoApp.Application.Features.Todos.Queries.GetTodos;

namespace TodoApp.Application;
public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {

        services.AddScoped<CreateTodoItemCommandHandler>();
        services.AddScoped<GetTodosHandler>();
        services.AddScoped<UpdateTodoCommandHandler>();

        return services;
    }
}
