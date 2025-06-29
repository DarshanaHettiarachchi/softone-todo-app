using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.Features.Todos.Commands.CreateTodo;
using TodoApp.Application.Features.Todos.Commands.DeleteToDo;
using TodoApp.Application.Features.Todos.Commands.ToggleCompleteStatus;
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
    private readonly DeleteTodoCommandHandler _deleteTodoCommandHandler;
    private readonly ToggleCompleteStatusHandler _toggleCompleteStatusCommandHandler;

    public ToDoItemsController(
        CreateTodoItemCommandHandler createToDoItemCommandHandler,
        GetTodosHandler getTodosHandler,
        UpdateTodoCommandHandler updateTodoCommandHandler,
        DeleteTodoCommandHandler deleteTodoCommandHandler,
        ToggleCompleteStatusHandler toggleCompleteStatusCommandHandler)
    {
        _createTodoItemCommandHandler = createToDoItemCommandHandler;
        _getTodosHandler = getTodosHandler;
        _updateTodoCommandHandler = updateTodoCommandHandler;
        _deleteTodoCommandHandler = deleteTodoCommandHandler;
        _toggleCompleteStatusCommandHandler = toggleCompleteStatusCommandHandler;
    }

    [HttpPost()]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateTodoItemCommand createToDoItemCommand)
    {
        var id = await _createTodoItemCommandHandler.HandleAsync(createToDoItemCommand);
        return Ok(id);
    }

    [Authorize]
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

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _deleteTodoCommandHandler.Handle(id);
        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id)
    {
        await _toggleCompleteStatusCommandHandler.Handle(id);
        return NoContent();
    }
}
