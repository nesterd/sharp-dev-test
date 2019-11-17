using Microsoft.EntityFrameworkCore.Migrations;

namespace PWApplication.Repository.Migrations
{
    public partial class add_startAmount_to_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "StartAmount",
                table: "Users",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartAmount",
                table: "Users");
        }
    }
}
