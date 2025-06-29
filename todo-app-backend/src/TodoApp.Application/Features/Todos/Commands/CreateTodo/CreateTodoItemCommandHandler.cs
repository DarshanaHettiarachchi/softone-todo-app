using TodoApp.Application.Contracts.Authentication;
using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodo;
public sealed class CreateTodoItemCommandHandler
{
    private readonly ITodoItemRepository _repo;
    private readonly ICurrentUserService _currentUserService;

    public CreateTodoItemCommandHandler(ITodoItemRepository repo, ICurrentUserService currentUserService)
    {
        _repo = repo;
        _currentUserService = currentUserService;
    }

    public async Task<CreateTodoItemCommandResponse> HandleAsync(CreateTodoItemCommand command)
    {

        var response = new CreateTodoItemCommandResponse();

        var userId = _currentUserService.UserId;

        if (userId == null)
        {
            throw new BadRequestException("User retrival failed");
        }

        var todoItem = new TodoItem
        {
            Title = command.Title,
            Description = command.Description,
            DueDate = command.DueDate,
            IsComplete = command.IsComplete,
            UserId = (int)userId
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
