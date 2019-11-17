using PWApplication.Api.ViewModels.Transactions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Logic.Transactions
{
    public class TransactionsService
    {
        public static void PopulateCurrentData(IEnumerable<TransactionViewModel> transactions, string currentUserId, decimal initialAccountAmount)
        {
            var previousAccountAmount = initialAccountAmount;
            foreach (var transaction in transactions.OrderBy(x => x.Time))
            {
                transaction.IsCurrentUserPayer = transaction.PayerId == currentUserId;
                transaction.CurrentAccountAmount = previousAccountAmount = previousAccountAmount + transaction.Amount;
            }

        }
    }
}
