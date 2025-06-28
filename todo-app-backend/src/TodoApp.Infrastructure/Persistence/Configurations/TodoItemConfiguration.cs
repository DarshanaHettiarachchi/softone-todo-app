using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Persistence.Configurations;
internal sealed class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.Property(e => e.Title).IsRequired().HasMaxLength(200);
    }
}
