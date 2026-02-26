using System;
using Hvadskaljegstemme.Models.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hvadskaljegstemme.Migrations
{
    /// <inheritdoc />
    public partial class AddBillTypeAndBillVoteDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:bill_type", "beslutningsforslag,lovforslag,borgerforslag")
                .Annotation("Npgsql:Enum:vote", "for,against,neither,skip")
                .OldAnnotation("Npgsql:Enum:vote", "for,against,neither,skip");

            migrationBuilder.AddColumn<BillType>(
                name: "bill_type",
                table: "bills",
                type: "bill_type",
                nullable: false,
                defaultValue: BillType.Beslutningsforslag);

            migrationBuilder.AddColumn<DateOnly>(
                name: "voted_at",
                table: "bills",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bill_type",
                table: "bills");

            migrationBuilder.DropColumn(
                name: "voted_at",
                table: "bills");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:vote", "for,against,neither,skip")
                .OldAnnotation("Npgsql:Enum:bill_type", "beslutningsforslag,lovforslag,borgerforslag")
                .OldAnnotation("Npgsql:Enum:vote", "for,against,neither,skip");
        }
    }
}
