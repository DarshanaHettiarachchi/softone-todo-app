using TodoApp.Domain.Entities;

namespace TodoApp.Application.Contracts.Persistence;
public interface ITodoItemRepository : IAsyncRepository<TodoItem>
{
    Task<TodoItem> MarkAsComplete(int id, CancellationToken cancellationToken);
    Task<List<TodoItem>> ListByUserIdAsync(int userId);
}
