using Hvadskaljegstemme.Models.Enums;

namespace Hvadskaljegstemme.Models;

public class UserAnswer
{
    public int Id { get; set; }

    public required Guid UserId { get; set; }

    public required Bill Bill { get; set; }

    public required Vote Vote { get; set; }

    public required DateTimeOffset AnsweredAt { get; set; }
}