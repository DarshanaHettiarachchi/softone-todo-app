using TodoApp.Application.Contracts.Authorization;
using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.ToggleCompleteStatus;
public class ToggleCompleteStatusHandler
{
    private readonly ITodoItemRepository _todoItemRepository;
    private readonly IResourceAuthorizationService _authZ;

    public ToggleCompleteStatusHandler(ITodoItemRepository todoItemRepository, IResourceAuthorizationService authZ)
    {
        _todoItemRepository = todoItemRepository;
        _authZ = authZ;
    }

    public async Task Handle(int id)
    {
        var todoToUpdateStatus = await _todoItemRepository.GetByIdAsync(id);
        if (todoToUpdateStatus == null)
        {
            throw new NotFoundException(nameof(TodoItem), id);
        }
        todoToUpdateStatus.IsComplete = !todoToUpdateStatus.IsComplete;

        _authZ.EnsureUserOwnsResource(todoToUpdateStatus.UserId);

        await _todoItemRepository.UpdateAsync(todoToUpdateStatus).ConfigureAwait(false);

    }
}
