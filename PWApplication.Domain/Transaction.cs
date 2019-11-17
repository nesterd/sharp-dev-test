using System;
using System.Collections.Generic;
using System.Text;

namespace PWApplication.Domain
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string PayerId { get; set; }
        public User Payer { get; set; }
        public string RecipientId { get; set; }
        public User Recipient { get; set; }
        public decimal Amount { get; set; }
    }
}
