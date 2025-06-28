using TodoApp.Application.Responses;

namespace TodoApp.Application.Features.Todos.Queries.GetTodos;
public class GetTodosQureyResponse : BaseResponse
{
    public GetTodosQureyResponse() : base()
    {

    }

    public List<GetTodoDto> Data { get; set; } = [];
}
