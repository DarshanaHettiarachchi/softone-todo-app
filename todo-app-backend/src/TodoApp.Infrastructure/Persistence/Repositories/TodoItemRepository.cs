using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Contracts.Persistence;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Persistence.Repositories;
internal sealed class TodoItemRepository : BaseRepository<TodoItem>, ITodoItemRepository
{
    public TodoItemRepository(TodoDbContext dbContext) : base(dbContext)
    {

    }

    public async Task<TodoItem> MarkAsComplete(int id, CancellationToken cancellationToken)
    {
        var toDoItem = await _dbContext.ToDoItems.FindAsync([id], cancellationToken: cancellationToken);
        if (toDoItem is not null)
        {
            toDoItem.IsComplete = true;
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        return toDoItem;
    }

    public async Task<List<TodoItem>> ListByUserIdAsync(int userId)
    {
        return await _dbContext.ToDoItems
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }
}
