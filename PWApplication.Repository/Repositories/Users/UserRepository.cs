using Microsoft.EntityFrameworkCore;
using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWApplication.Repository.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly Db _db;
        private readonly decimal _startAmount;

        public UserRepository(Db db, decimal startAmount)
        {
            _db = db;
            _startAmount = startAmount;
        }

        public async Task<User> CreateUser(string userName, string userEmail, string passwordHash)
        {
            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Name = userName,
                Email = userEmail,
                Password = passwordHash,
                StartAmount = _startAmount,
            };
            await _db.Users.AddAsync(user);

            await _db.SaveChangesAsync();

            return user;
        }

        public async Task<User> EditUser(User user)
        {
            _db.Entry<User>(user).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return user;
        }

        public async Task<decimal> GetAmountForTime(User user, DateTime time)
        {
            var amount = await _db.Transactions.Where(x => x.RecipientId == user.Id && x.Time < time).Select(x => x.Amount)
               .Concat(_db.Transactions.Where(x => x.PayerId == user.Id && x.Time < time).Select(x => -x.Amount)).SumAsync();
            return amount + user.StartAmount;
        }

        public async Task<decimal> GetCurrentAmount(User user)
        {
            return await GetAmountForTime(user, DateTime.Now);
        }

        public async Task<User> GetUser(string id)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> GetUsers()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<List<User>> GetUsers(string id)
        {
            return await _db.Users.Where(x => x.Id != id).OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<bool> IsEmailUniq(string email)
        {
            var isSameEmailAlreadyExist = await _db.Users.AnyAsync(x => x.Email == email);
            return !isSameEmailAlreadyExist;
        }
    }
}
