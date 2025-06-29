using TodoApp.Application.Contracts.Authorization;
using TodoApp.Application.Contracts.Persistence;
using TodoApp.Application.Exceptions;
using TodoApp.Application.Features.Todos.Commands.CreateTodo;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Features.Todos.Commands.UpdateTodo;
public class UpdateTodoCommandHandler
{
    private readonly ITodoItemRepository _todoItemRepository;
    private readonly IResourceAuthorizationService _authZ;

    public UpdateTodoCommandHandler(ITodoItemRepository todoItemRepository, IResourceAuthorizationService authZ)
    {
        _todoItemRepository = todoItemRepository;
        _authZ = authZ;
    }

    public async Task Handle(int id, UpdateTodoCommand command)
    {
        var validator = new UpdateTodoCommandValidator();
        var validationResult = await validator.ValidateAsync(command);

        if (validationResult.Errors.Count > 0)
        {
            throw new ValidationException(validationResult);
        }

        var todoToUpdate = await _todoItemRepository.GetByIdAsync(id);

        if (todoToUpdate == null)
        {
            throw new NotFoundException(nameof(TodoItem), command.Id);
        }

        _authZ.EnsureUserOwnsResource(todoToUpdate.UserId);

        todoToUpdate.Title = command.Title;
        todoToUpdate.Description = command.Description;
        todoToUpdate.DueDate = command.DueDate;

        await _todoItemRepository.UpdateAsync(todoToUpdate).ConfigureAwait(false);

    }
}
