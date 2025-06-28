using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TodoApp.Domain.Common;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Persistence;

public class TodoDbContext : DbContext
{

    public TodoDbContext(DbContextOptions<TodoDbContext> options)
       : base(options)
    {
    }

    public DbSet<TodoItem> ToDoItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TodoDbContext).Assembly);

        modelBuilder.Entity<TodoItem>().HasData(new TodoItem
        {
            Id = 1,
            Title = "Todo 1",
            Description = "Todo 1 Description",
            DueDate = new DateOnly(2025, 7, 10),
            IsComplete = false,
            CreatedDate = DateTime.Now,
            CreatedBy = "1"
        });

        modelBuilder.Entity<TodoItem>().HasData(new TodoItem
        {
            Id = 2,
            Title = "Todo 1",
            Description = "Todo 1 Description",
            DueDate = new DateOnly(2025, 7, 12),
            IsComplete = true,
            CreatedDate = DateTime.Now,
            CreatedBy = "1"
        });

    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedDate = DateTime.Now;
                    entry.Entity.CreatedBy = "1";
                    break;
                case EntityState.Modified:
                    entry.Entity.LastModifiedDate = DateTime.Now;
                    entry.Entity.LastModifiedBy = "1";
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}
