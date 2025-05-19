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
        //public DbSet<TextUpload> TextUploads { get; set; }
        public DbSet<CompletedInvitation> CompletedInvitations { get; set; }
        public DbSet<CategoryDto> Categories { get; set; }
        public DbSet<CategoryField> CategoryField { get; set; }
        public DbSet<TemplateField> TemplateField { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("invitationlineDB"));
            //"Server=(localdb)\\MSSQLLocalDB;Database=invitation_db");
            //optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }
        // הוסף את הקוד הבא:
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // הגדרת Foreign Key עם NO ACTION או RESTRICT (מונע Cascade)
        //    //modelBuilder.Entity<CompletedInvitation>()
        //    //    .HasOne(c => c.TextUpload)
        //    //    .WithMany()
        //    //    .HasForeignKey(c => c.TextUploadId)
        //    //    .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction

        //    modelBuilder.Entity<CompletedInvitation>()
        //        .HasOne(c => c.Template)
        //        .WithMany()
        //        .HasForeignKey(c => c.TemplateId)
        //        .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction

        //    modelBuilder.Entity<CompletedInvitation>()
        //        .HasOne(c => c.User)
        //        .WithMany()
        //        .HasForeignKey(c => c.UserId)
        //        .OnDelete(DeleteBehavior.Restrict);  // או DeleteBehavior.NoAction
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ 1. מניעת Cascade בין Templates ל- Categories
            modelBuilder.Entity<Template>()
                .HasOne(t => t.Category)
                .WithMany()
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);  // ❗ זה מה שימנע את השגיאה שלך

            // ✅ 2. מניעת Cascade בין CompletedInvitation ל- Template
            modelBuilder.Entity<CompletedInvitation>()
                .HasOne(c => c.Template)
                .WithMany()
                .HasForeignKey(c => c.TemplateId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ 3. מניעת Cascade בין CompletedInvitation ל- User
            modelBuilder.Entity<CompletedInvitation>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

     //       modelBuilder.Entity<TemplateField>()
     //.HasOne(tf => tf.Field)
     //.WithMany()
     //.HasForeignKey(tf => tf.FieldId)
     //.OnDelete(DeleteBehavior.Restrict);

        }
    }

}
