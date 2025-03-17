using Microsoft.EntityFrameworkCore;
using PaperDreams_Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace PaperDreams_Server.Data
{
    public class DataContext : DbContext 
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<TextUpload> TextUploads { get; set; }
        public DbSet<CompletedInvitation> CompletedInvitations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=invitation_db");
            //optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }
        // הוסף את הקוד הבא:
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // הגדרת Foreign Key עם NO ACTION או RESTRICT (מונע Cascade)
            modelBuilder.Entity<CompletedInvitation>()
                .HasOne(c => c.TextUpload)
                .WithMany()
                .HasForeignKey(c => c.TextUploadId)
                .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction

            modelBuilder.Entity<CompletedInvitation>()
                .HasOne(c => c.Template)
                .WithMany()
                .HasForeignKey(c => c.TemplateId)
                .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction

            modelBuilder.Entity<CompletedInvitation>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction
        }
    }
}
