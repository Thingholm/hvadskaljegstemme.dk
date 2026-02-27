using Hvadskaljegstemme.Models.Enums;

namespace Hvadskaljegstemme.Dtos;

public record Bill
(
    int Id,
    string BillTag,
    string Title,
    string Description,
    string Question,
    string ForExplanation,
    string AgainstExplanation,
    string Url,
    bool IsPassed,
    BillType BillType,
    DateOnly VotedAt,
    int? Order,
    IEnumerable<PartyVote> PartyVotes
);

public record PartyVote
(
    int PartyId,
    Vote Vote
);
