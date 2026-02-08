using Hvadskaljegstemme.Models.Enums;

namespace Hvadskaljegstemme.Dtos;

public record Answer
(
    int BillId,
    Vote Vote,
    Guid UserId
);