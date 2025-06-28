using TodoApp.Application.Contracts.Persistence;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.CreateToDoItem;
public sealed class CreateToDoItemCommandHandler
{
    private readonly IToDoItemRepository _repo;

    public CreateToDoItemCommandHandler(IToDoItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> HandleAsync(CreateToDoItemCommand command)
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
