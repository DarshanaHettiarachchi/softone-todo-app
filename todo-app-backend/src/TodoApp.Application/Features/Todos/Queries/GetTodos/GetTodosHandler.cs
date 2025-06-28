using TodoApp.Application.Contracts.Persistence;

namespace TodoApp.Application.Features.Todos.Queries.GetTodos;
public class GetTodosHandler
{
    private readonly ITodoItemRepository _todoItemRepository;
    public GetTodosHandler(ITodoItemRepository todoItemRepository)
    {
        _todoItemRepository = todoItemRepository;
    }

    public async Task<GetTodosQureyResponse> Handle()
    {
        var response = new GetTodosQureyResponse();
        var todos = await _todoItemRepository.ListAllAsync();

        var todoDtoList = todos.Select(static x => new GetTodoDto
        {
            Id = x.Id,
            Title = x.Title,
            Description = x.Description,
            DueDate = x.DueDate,
            IsComplete = x.IsComplete
        }).ToList();

        response.Success = true;
        response.Data = todoDtoList;

        return response;

    }

}
