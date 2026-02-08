namespace Hvadskaljegstemme.Models;

public class Bill
{
    public int Id { get; set; }

    public required string BillTag { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public required string Question { get; set; }

    public required string ForExplanation { get; set; }

    public required string AgainstExplanation { get; set; }

    public required string Url { get; set; }

    public ICollection<PartyVote> PartyVotes { get; set; } = [];

    public bool IsPassed { get; set; }
}