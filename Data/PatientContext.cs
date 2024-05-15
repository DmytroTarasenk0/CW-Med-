using Microsoft.EntityFrameworkCore;
using CW.Models;

namespace CW.Data
{
    public class PatientContext : DbContext
    {
        public PatientContext(DbContextOptions<PatientContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Patient>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Patient>()
                .Property(p => p.Sex)
                .IsRequired();

            modelBuilder.Entity<Patient>()
                .Property(p => p.YearOB)
                .IsRequired();

            modelBuilder.Entity<Patient>()
                .Property(p => p.Symptoms)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
