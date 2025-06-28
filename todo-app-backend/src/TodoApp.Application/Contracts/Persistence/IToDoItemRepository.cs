using TodoApp.Domain.Entities;

namespace TodoApp.Application.Contracts.Persistence;
public interface IToDoItemRepository : IAsyncRepository<TodoItem>
{
    Task<TodoItem> MarkAsComplete(int id, CancellationToken cancellationToken);
}
