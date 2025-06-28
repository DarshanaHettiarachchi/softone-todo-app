using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Features.Todos.Commands.CreateTodoItem;

namespace TodoApp.Api.Controllers;
[Route("api/todos")]
[ApiController]
public class ToDoItemsController : ControllerBase
{
    private readonly CreateTodoItemCommandHandler _createTodoItemCommandHandler;
    private static readonly string[] value = new[] { "Hello" };

    public ToDoItemsController(CreateTodoItemCommandHandler createToDoItemCommandHandler)
    {
        _createTodoItemCommandHandler = createToDoItemCommandHandler;

    }

    [HttpPost()]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateTodoItemCommand createToDoItemCommand)
    {
        var id = await _createTodoItemCommandHandler.HandleAsync(createToDoItemCommand);
        return Ok(id);
    }


    [HttpGet()]
    public async Task<ActionResult<string[]>> Index()
    {
        await Task.Delay(500);
        return Ok(value);
    }
}
