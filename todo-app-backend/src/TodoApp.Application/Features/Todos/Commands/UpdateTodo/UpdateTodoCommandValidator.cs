using FluentValidation;
using TodoApp.Application.Features.Todos.Commands.UpdateTodo;

namespace TodoApp.Application.Features.Todos.Commands.CreateTodo;
public sealed class UpdateTodoCommandValidator : AbstractValidator<UpdateTodoCommand>
{
    public UpdateTodoCommandValidator()
    {
        RuleFor(p => p.Title)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MinimumLength(3).WithMessage("{PropertyName} must be longer than 3 characters.");

        RuleFor(p => p.Description)
                .MaximumLength(500).WithMessage("{PropertyName} must not exceed 500 characters.");

        RuleFor(p => p.DueDate)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .Must(dueDate => dueDate >= DateOnly.FromDateTime(DateTime.UtcNow))
                .WithMessage("Due date must be today or in the future.");

    }
}
