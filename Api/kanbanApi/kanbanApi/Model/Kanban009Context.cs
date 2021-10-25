using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Kanban009Context : DbContext
    {
        public Kanban009Context()
        {
        }

        public Kanban009Context(DbContextOptions<Kanban009Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<UsersOnProject> UsersOnProjects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("workstation id=Kanban009.mssql.somee.com;packet size=4096;user id=guinz23_SQLLogin_1;pwd=p8ll55uj5p;data source=Kanban009.mssql.somee.com;persist security info=False;initial catalog=Kanban009");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('A')");
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.ToTable("Position");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.NamePosition).IsRequired();
            });

            modelBuilder.Entity<Priority>(entity =>
            {
                entity.ToTable("Priority");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(1);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Project");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.DeliveryDate).HasColumnType("date");

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.IdCompanyNavigation)
                    .WithMany(p => p.Projects)
                    .HasForeignKey(d => d.IdCompany)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CompanyProject");
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.DeliveryDate).HasColumnType("date");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.Property(e => e.State).IsRequired();

                entity.HasOne(d => d.IdPriorityNavigation)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.IdPriority)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Fk_PriorityTask");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProjectTask");

                entity.HasOne(d => d.IdUserAssignedNavigation)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.IdUserAssigned)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TaskUserAssigned");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.LastName).IsRequired();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.Password).IsRequired();

                entity.HasOne(d => d.IdPositionNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdPosition)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PositionUser");

                entity.HasOne(d => d.IdUserTypeNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdUserType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserTypeUser");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("UserType");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Type).IsRequired();
            });

            modelBuilder.Entity<UsersOnProject>(entity =>
            {
                entity.ToTable("UsersOnProject");

                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.UsersOnProjects)
                    .HasForeignKey(d => d.IdProject)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProjectUserProject");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.UsersOnProjects)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersInProject");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
