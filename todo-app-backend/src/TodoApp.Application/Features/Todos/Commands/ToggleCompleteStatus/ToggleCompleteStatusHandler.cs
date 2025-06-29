using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.ToggleCompleteStatus;
public class ToggleCompleteStatusHandler
{
    private readonly ITodoItemRepository _todoItemRepository;

    public ToggleCompleteStatusHandler(ITodoItemRepository todoItemRepository)
    {
        _todoItemRepository = todoItemRepository;
    }

    public async Task Handle(int id)
    {
        var todoToUpdateStatus = await _todoItemRepository.GetByIdAsync(id);
        if (todoToUpdateStatus == null)
        {
            throw new NotFoundException(nameof(TodoItem), id);
        }
        todoToUpdateStatus.IsComplete = !todoToUpdateStatus.IsComplete;

        await _todoItemRepository.UpdateAsync(todoToUpdateStatus).ConfigureAwait(false);

    }
}
