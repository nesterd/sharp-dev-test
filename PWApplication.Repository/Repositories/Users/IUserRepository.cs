using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PWApplication.Repository.Repositories.Users
{
    public interface IUserRepository
    {
        Task<User> GetUser(string id);
        Task<List<User>> GetUsers(string id);
        Task<User> GetUserByEmail(string email);
        Task<bool> IsEmailUniq(string email);
        Task<User> CreateUser(string userName, string userEmail, string passwordHash);
        Task<User> EditUser(User user);
        Task<decimal> GetCurrentAmount(User user);
        Task<decimal> GetAmountForTime(User user, DateTime time);
    }
}
