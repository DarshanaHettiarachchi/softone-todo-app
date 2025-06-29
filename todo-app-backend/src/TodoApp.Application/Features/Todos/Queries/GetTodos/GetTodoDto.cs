namespace TodoApp.Application.Features.Todos.Queries.GetTodos;
public sealed record GetTodoDto
{
    public int Id { get; init; }
    public string Title { get; init; }
    public string? Description { get; init; }
    public DateOnly DueDate { get; init; }
    public bool Completed { get; init; }
    public DateTime CreatedDate { get; init; }

}
