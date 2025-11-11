using Microsoft.EntityFrameworkCore;
using Book_api.Models;

namespace Book_api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Quote> Quotes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Book>()
                .Property(b => b.title)
                .HasMaxLength(50);

        modelBuilder.Entity<Book>()
                .Property(b => b.author)
                .HasMaxLength(50);

        modelBuilder.Entity<Quote>()
                .Property(q => q.content)
                .HasMaxLength(100);

        modelBuilder.Entity<Quote>()
                .Property(q => q.author)
                .HasMaxLength(50);

        modelBuilder.Entity<User>()
                .Property(u => u.name)
                .HasMaxLength(20);
    }
}
