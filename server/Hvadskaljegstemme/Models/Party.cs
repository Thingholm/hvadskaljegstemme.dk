using System.ComponentModel.DataAnnotations;

namespace Hvadskaljegstemme.Models;

public class Party
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required char Letter { get; set; }

    [StringLength(7, MinimumLength = 7)]
    public required string ColorHex { get; set; }
}