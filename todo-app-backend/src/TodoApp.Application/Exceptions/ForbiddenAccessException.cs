namespace TodoApp.Application.Exceptions;

public class ForbiddenAccessException : Exception
{
    public ForbiddenAccessException()
        : base("You are not authorized to access this resource.")
    {
    }

    public ForbiddenAccessException(string message)
        : base(message)
    {
    }

    public ForbiddenAccessException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
