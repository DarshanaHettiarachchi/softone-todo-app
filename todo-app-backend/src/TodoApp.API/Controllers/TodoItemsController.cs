using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Features.Todos.Commands.CreateTodoItem;
using TodoApp.Application.Features.Todos.Queries.GetTodos;

namespace TodoApp.Api.Controllers;
[Route("api/todos")]
[ApiController]
public class ToDoItemsController : ControllerBase
{
    private readonly CreateTodoItemCommandHandler _createTodoItemCommandHandler;
    private readonly GetTodosHandler _getTodosHandler;

    public ToDoItemsController(
        CreateTodoItemCommandHandler createToDoItemCommandHandler,
        GetTodosHandler getTodosHandler
      )
    {
        _createTodoItemCommandHandler = createToDoItemCommandHandler;
        _getTodosHandler = getTodosHandler;
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
        var todosResponse = await _getTodosHandler.Handle();
        return Ok(todosResponse);
    }
}
