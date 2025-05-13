using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaperDreams_Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatedataContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompletedInvitations_Users_UserId",
                table: "CompletedInvitations");

            migrationBuilder.AddForeignKey(
                name: "FK_CompletedInvitations_Users_UserId",
                table: "CompletedInvitations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompletedInvitations_Users_UserId",
                table: "CompletedInvitations");

            migrationBuilder.AddForeignKey(
                name: "FK_CompletedInvitations_Users_UserId",
                table: "CompletedInvitations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
