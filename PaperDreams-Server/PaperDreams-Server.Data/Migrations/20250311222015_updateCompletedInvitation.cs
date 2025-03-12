using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaperDreams_Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateCompletedInvitation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "CompletedInvitations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "CompletedInvitations");
        }
    }
}
