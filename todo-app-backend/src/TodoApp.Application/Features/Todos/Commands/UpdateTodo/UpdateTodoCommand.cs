namespace TodoApp.Application.Features.Todos.Commands.UpdateTodo;
public sealed record UpdateTodoCommand
{
    public required int Id { get; init; }
    public required string Title { get; init; }
    public string Description { get; init; }
    public DateOnly DueDate { get; init; }
    public bool IsComplete { get; init; }
}
