using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.DeleteToDo;
public class DeleteTodoCommandHandler
{
    private readonly ITodoItemRepository _todoItemRepository;

    public DeleteTodoCommandHandler(ITodoItemRepository todoItemRepository)
    {
        _todoItemRepository = todoItemRepository;
    }

    public async Task Handle(int id)
    {
        var todoToDelete = await _todoItemRepository.GetByIdAsync(id);
        if (todoToDelete == null)
        {
            throw new NotFoundException(nameof(TodoItem), id);
        }
        await _todoItemRepository.DeleteAsync(todoToDelete).ConfigureAwait(false);
    }
}
