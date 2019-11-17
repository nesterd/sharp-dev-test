using System;
using System.Collections.Generic;
using System.Text;

namespace PWApplication.Domain
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal StartAmount { get; set; }

        public ICollection<Transaction> EntryTransactions { get; set; }
        public ICollection<Transaction> OutgoTransactions { get; set; }
    }
}
