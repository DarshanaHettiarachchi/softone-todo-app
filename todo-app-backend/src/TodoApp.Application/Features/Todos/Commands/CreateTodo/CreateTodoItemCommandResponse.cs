using TodoApp.Application.Responses;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodo;
public sealed class CreateTodoItemCommandResponse : BaseResponse
{
    public CreateTodoItemCommandResponse() : base()
    {

    }

    public CreateTodoItemDto Data { get; set; }

}
