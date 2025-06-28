using TodoApp.Application.Responses;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodoItem;
public sealed class CreateTodoItemCommandResponse : BaseResponse
{
    public CreateTodoItemCommandResponse() : base()
    {

    }

    public CreateTodoItemDto Data { get; set; }

}
