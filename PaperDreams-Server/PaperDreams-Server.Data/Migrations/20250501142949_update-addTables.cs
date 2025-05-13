using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PaperDreams_Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateaddTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TemplateField",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<int>(type: "int", nullable: false),
                    FieldId = table.Column<int>(type: "int", nullable: false),
                    X = table.Column<int>(type: "int", nullable: false),
                    Y = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TemplateField", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TemplateField_Field_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TemplateField_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TemplateField_FieldId",
                table: "TemplateField",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_TemplateField_TemplateId",
                table: "TemplateField",
                column: "TemplateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TemplateField");
        }
    }
}
