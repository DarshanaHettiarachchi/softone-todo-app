using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Features.Todos.Commands.CreateTodoItem;
using TodoApp.Application.Features.Todos.Queries.GetTodos;

namespace TodoApp.Application;
public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {

        services.AddScoped<CreateTodoItemCommandHandler>();
        services.AddScoped<GetTodosHandler>();

        return services;
    }
}
