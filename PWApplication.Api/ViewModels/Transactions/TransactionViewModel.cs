using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.ViewModels.Transactions
{
    public class TransactionViewModel
    {
        private decimal _amount;

        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string PayerId { get; set; }
        public string PayerName { get; set; }
        public string RecipientId { get; set; }
        public string RecipientName { get; set; }
        public decimal CurrentAccountAmount { get; set; }
        public bool IsCurrentUserPayer { get; set; }

        public decimal Amount
        {
            get
            {
                return IsCurrentUserPayer ? -_amount : _amount;
            }
            set
            {
                _amount = value;
            }
        }

        public string CorrespondentName => IsCurrentUserPayer ? RecipientName : PayerName;
    }
}
