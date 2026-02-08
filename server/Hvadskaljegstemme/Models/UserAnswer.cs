using Hvadskaljegstemme.Models.Enums;

namespace Hvadskaljegstemme.Models;

public class UserAnswer
{
    public int Id { get; set; }

    public required Guid UserId { get; set; }

    public int BillId { get; set; }

    public Bill? Bill { get; set; }

    public required Vote Vote { get; set; }

    public DateTimeOffset AnsweredAt { get; private set; }
}