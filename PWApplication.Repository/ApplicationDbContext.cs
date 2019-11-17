using Microsoft.EntityFrameworkCore;
using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace PWApplication.Repository
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasMany(a => a.EntryTransactions).WithOne(x => x.Recipient).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasMany(a => a.OutgoTransactions).WithOne(x => x.Payer).OnDelete(DeleteBehavior.Restrict);
        }

    }
}
