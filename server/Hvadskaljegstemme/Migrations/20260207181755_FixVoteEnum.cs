using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hvadskaljegstemme.Migrations
{
    /// <inheritdoc />
    public partial class FixVoteEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                ALTER TABLE user_answers
                ALTER COLUMN vote TYPE vote
                USING (
                    CASE vote
                        WHEN 0 THEN 'for'
                        WHEN 1 THEN 'against'
                        WHEN 2 THEN 'neither'
                    END
                )::vote;
            """);

            migrationBuilder.Sql("""
                ALTER TABLE party_votes
                ALTER COLUMN vote TYPE vote
                USING (
                    CASE vote
                        WHEN 0 THEN 'for'
                        WHEN 1 THEN 'against'
                        WHEN 2 THEN 'neither'
                    END
                )::vote;
            """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.Sql("""
                ALTER TABLE user_answers
                ALTER COLUMN vote TYPE integer
                USING (
                    CASE vote
                        WHEN 'for' THEN 0
                        WHEN 'against' THEN 1
                        WHEN 'neither' THEN 2
                    END
                );
            """);

            migrationBuilder.Sql("""
                ALTER TABLE party_votes
                ALTER COLUMN vote TYPE integer
                USING (
                    CASE vote
                        WHEN 'for' THEN 0
                        WHEN 'against' THEN 1
                        WHEN 'neither' THEN 2
                    END
                );
            """);
        }
    }
}
