using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Features.Todos.Commands.CreateTodoItem;

namespace TodoApp.Application;
public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {

        services.AddScoped<CreateTodoItemCommandHandler>();

        return services;
    }
}
