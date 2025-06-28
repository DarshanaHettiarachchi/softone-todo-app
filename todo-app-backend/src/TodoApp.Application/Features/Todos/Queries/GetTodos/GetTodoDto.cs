namespace TodoApp.Application.Features.Todos.Queries.GetTodos;
public class GetTodoDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateOnly DueDate { get; set; }
    public bool IsComplete { get; set; }

}
