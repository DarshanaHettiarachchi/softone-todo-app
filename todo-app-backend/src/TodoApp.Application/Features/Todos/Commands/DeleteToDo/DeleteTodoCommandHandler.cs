using TodoApp.Application.Contracts.Authorization;
using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.DeleteToDo;
public class DeleteTodoCommandHandler
{
    private readonly ITodoItemRepository _todoItemRepository;
    private readonly IResourceAuthorizationService _authZ;

    public DeleteTodoCommandHandler(ITodoItemRepository todoItemRepository, IResourceAuthorizationService authZ)
    {
        _todoItemRepository = todoItemRepository;
        _authZ = authZ;
    }

    public async Task Handle(int id)
    {
        var todoToDelete = await _todoItemRepository.GetByIdAsync(id);
        if (todoToDelete == null)
        {
            throw new NotFoundException(nameof(TodoItem), id);
        }

        _authZ.EnsureUserOwnsResource(todoToDelete.UserId);

        await _todoItemRepository.DeleteAsync(todoToDelete).ConfigureAwait(false);
    }
}
