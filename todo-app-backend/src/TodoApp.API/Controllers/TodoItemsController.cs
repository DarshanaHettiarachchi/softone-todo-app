using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Features.Todos.Commands.CreateTodo;
using TodoApp.Application.Features.Todos.Commands.UpdateTodo;
using TodoApp.Application.Features.Todos.Queries.GetTodos;

namespace TodoApp.Api.Controllers;
[Route("api/todos")]
[ApiController]
public class ToDoItemsController : ControllerBase
{
    private readonly CreateTodoItemCommandHandler _createTodoItemCommandHandler;
    private readonly GetTodosHandler _getTodosHandler;
    private readonly UpdateTodoCommandHandler _updateTodoCommandHandler;

    public ToDoItemsController(
        CreateTodoItemCommandHandler createToDoItemCommandHandler,
        GetTodosHandler getTodosHandler
,
        UpdateTodoCommandHandler updateTodoCommandHandler)
    {
        _createTodoItemCommandHandler = createToDoItemCommandHandler;
        _getTodosHandler = getTodosHandler;
        _updateTodoCommandHandler = updateTodoCommandHandler;
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

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, [FromBody] UpdateTodoCommand updateTodoCommand)
    {
        await _updateTodoCommandHandler.Handle(id, updateTodoCommand);
        return NoContent();
    }
}
