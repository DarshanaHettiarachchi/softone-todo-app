using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Features.Todos.Commands.CreateTodoItem;

namespace TodoApp.Api.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ToDoItemsController : ControllerBase
{
    private readonly CreateTodoItemCommandHandler _createTodoItemCommandHandler;
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
}
