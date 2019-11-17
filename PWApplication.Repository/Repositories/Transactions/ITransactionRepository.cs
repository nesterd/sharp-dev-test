using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PWApplication.Repository.Repositories.Transactions
{
    public interface ITransactionRepository
    {
        Task<Transaction> Get(int id);
        Task<List<Transaction>> GetList(string userId);
        Task<List<Transaction>> GetOnlyOutgoList(string userId);
        Task Add(Transaction transaction);
    }
}
