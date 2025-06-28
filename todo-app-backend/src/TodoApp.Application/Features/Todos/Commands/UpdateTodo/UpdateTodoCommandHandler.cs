using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.UpdateTodo;
public class UpdateTodoCommandHandler
{
    private readonly ITodoItemRepository _todoItemRepository;

    public UpdateTodoCommandHandler(ITodoItemRepository todoItemRepository)
    {
        _todoItemRepository = todoItemRepository;
    }

    public async Task Handle(UpdateTodoCommand command)
    {

        var todoToUpdate = await _todoItemRepository.GetByIdAsync(command.Id);

        if (todoToUpdate == null)
        {
            throw new NotFoundException(nameof(TodoItem), command.Id);
        }

        todoToUpdate.Title = command.Title;
        todoToUpdate.Description = command.Description;
        todoToUpdate.DueDate = command.DueDate;

        await _todoItemRepository.UpdateAsync(todoToUpdate).ConfigureAwait(false);

    }
}
