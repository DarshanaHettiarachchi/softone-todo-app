using TodoApp.Application.Contracts.Persistence;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodoItem;
public sealed class CreateTodoItemCommandHandler
{
    private readonly ITodoItemRepository _repo;

    public CreateTodoItemCommandHandler(ITodoItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> HandleAsync(CreateTodoItemCommand command)
    {
        var todoItem = new TodoItem
        {
            Title = command.Title,
            Description = command.Description,
            DueDate = command.DueDate,
            IsComplete = command.IsComplete,
        };

        await _repo.AddAsync(todoItem);

        return 1;
    }
}
