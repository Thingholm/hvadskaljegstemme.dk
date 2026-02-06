using Hvadskaljegstemme.Models.Enums;

namespace Hvadskaljegstemme.Models;

public class PartyVote
{
    public int Id { get; set; }

    public Vote Vote { get; set; }

    public required Party Party { get; set; }

    public required Bill Bill { get; set; }
}