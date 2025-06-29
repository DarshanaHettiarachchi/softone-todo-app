using TodoApp.Application.Contracts.Authentication;
using TodoApp.Application.Contracts.Persistence;

namespace TodoApp.Application.Features.Todos.Queries.GetTodos;
public class GetTodosHandler
{
    private readonly ITodoItemRepository _todoItemRepository;
    private readonly ICurrentUserService _currentUserService;
    public GetTodosHandler(ITodoItemRepository todoItemRepository, ICurrentUserService currentUserService)
    {
        _todoItemRepository = todoItemRepository;
        _currentUserService = currentUserService;
    }

    public async Task<GetTodosQureyResponse> Handle()
    {
        var response = new GetTodosQureyResponse();

        var currentUserId = _currentUserService.UserId
            ?? throw new UnauthorizedAccessException("User must be authenticated.");

        var todos = await _todoItemRepository.ListByUserIdAsync(currentUserId);

        var todoDtoList = todos.Select(static x => new GetTodoDto
        {
            Id = x.Id,
            Title = x.Title,
            Description = x.Description,
            DueDate = x.DueDate,
            Completed = x.IsComplete,
            CreatedDate = x.CreatedDate,
        }).ToList();

        response.Success = true;
        response.Data = todoDtoList;

        return response;

    }

}
