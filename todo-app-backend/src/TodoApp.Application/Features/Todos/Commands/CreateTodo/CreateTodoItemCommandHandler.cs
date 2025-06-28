using TodoApp.Application.Contracts.Persistence;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodo;
public sealed class CreateTodoItemCommandHandler
{
    private readonly ITodoItemRepository _repo;

    public CreateTodoItemCommandHandler(ITodoItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<CreateTodoItemCommandResponse> HandleAsync(CreateTodoItemCommand command)
    {

        var response = new CreateTodoItemCommandResponse();

        var todoItem = new TodoItem
        {
            Title = command.Title,
            Description = command.Description,
            DueDate = command.DueDate,
            IsComplete = command.IsComplete,
        };

        var todoEntity = await _repo.AddAsync(todoItem);

        var createdTodoDto = new CreateTodoItemDto
        {
            Id = todoEntity.Id,
            Title = todoEntity.Title,
            Description = todoEntity.Description,
            DueDate = todoEntity.DueDate,
            Completed = todoEntity.IsComplete,
            CreatedDate = todoEntity.CreatedDate,
        };

        response.Data = createdTodoDto;

        return response;
    }
}
