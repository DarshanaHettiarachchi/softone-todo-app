namespace TodoApp.Application.Features.Todos.Commands.CreateTodo;
public sealed record CreateTodoItemCommand
{
    public required string Title { get; init; }
    public string? Description { get; init; }
    public DateOnly DueDate { get; init; }
    public bool IsComplete { get; init; }
}
