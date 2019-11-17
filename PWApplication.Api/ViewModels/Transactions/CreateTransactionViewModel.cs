using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.ViewModels.Transactions
{
    public class CreateTransactionViewModel
    {
        [Required]
        public string RecipientId { get; set; }
        [Required]
        public decimal Amount { get; set; }
    }
}
