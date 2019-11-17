using Microsoft.EntityFrameworkCore;
using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace PWApplication.Repository.Repositories.Transactions
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly Db _db;

        public TransactionRepository(Db db)
        {
            _db = db;
        }

        public async Task<Transaction> Get(int id)
        {
            return await _db.Transactions.FindAsync(id);
        }

        public async Task<List<Transaction>> GetList(string userId)
        {
            return await GetQuery()
                .OrderByDescending(x => x.Time)
                .Where(x => x.PayerId == userId || x.RecipientId == userId)
                .ToListAsync();
        }

        public async Task Add(Transaction transaction)
        {
            _db.Entry<Transaction>(transaction).State = EntityState.Added;
            await _db.SaveChangesAsync();
        }

        public async Task<List<Transaction>> GetOnlyOutgoList(string userId)
        {
            return await GetQuery()
                .Where(x => x.PayerId == userId)
                .OrderByDescending(x => x.Time)
                .ToListAsync();
        }

        private IQueryable<Transaction> GetQuery()
        {
            return _db.Transactions
                .Include(x => x.Payer)
                .Include(x => x.Recipient);
        }
    }
}
