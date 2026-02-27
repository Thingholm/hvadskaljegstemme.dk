using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hvadskaljegstemme.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderToBills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "order",
                table: "bills",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "order",
                table: "bills");
        }
    }
}
