using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hvadskaljegstemme.Migrations
{
    /// <inheritdoc />
    public partial class AddSkipToVote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:vote", "for,against,neither,skip")
                .OldAnnotation("Npgsql:Enum:vote", "for,against,neither");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:vote", "for,against,neither")
                .OldAnnotation("Npgsql:Enum:vote", "for,against,neither,skip");
        }
    }
}
