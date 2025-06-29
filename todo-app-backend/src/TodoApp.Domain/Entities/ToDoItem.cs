using TodoApp.Domain.Common;

namespace TodoApp.Domain.Entities;
public class TodoItem : AuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateOnly DueDate { get; set; }
    public bool IsComplete { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
