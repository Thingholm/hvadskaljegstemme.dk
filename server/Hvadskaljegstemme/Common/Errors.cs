namespace Hvadskaljegstemme.Common;

public abstract class Error
{
    public string Message { get; }

    public Error(string message)
    {
        Message = message;
    }
}

public class ValidationError : Error
{
    public ValidationError(string message) : base(message) { }
}

public class DBError : Error
{
    public DBError(string message) : base(message) { }
}

