using Microsoft.Extensions.DependencyInjection;
using TodoApp.Application.Contracts.Authorization;
using TodoApp.Application.Features.Todos.Commands.CreateTodo;
using TodoApp.Application.Features.Todos.Commands.DeleteToDo;
using TodoApp.Application.Features.Todos.Commands.ToggleCompleteStatus;
using TodoApp.Application.Features.Todos.Commands.UpdateTodo;
using TodoApp.Application.Features.Todos.Queries.GetTodos;
using TodoApp.Application.Services;

namespace TodoApp.Application;
public static class ApplicationServiceRegistration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {

        services.AddScoped<CreateTodoItemCommandHandler>();
        services.AddScoped<GetTodosHandler>();
        services.AddScoped<UpdateTodoCommandHandler>();
        services.AddScoped<DeleteTodoCommandHandler>();
        services.AddScoped<ToggleCompleteStatusHandler>();
        services.AddScoped<IResourceAuthorizationService, ResourceAuthorizationService>();

        return services;
    }
}
