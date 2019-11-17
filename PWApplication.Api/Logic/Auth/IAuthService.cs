using PWApplication.Api.ViewModels.Accounts;
using PWApplication.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Logic.Auth
{
    public interface IAuthService
    {
        Task<User> GetUser(string userId);
        Task<User> GetUserByEmail(string email);
        bool CheckPassword(string loginPassword, string dbPasswordHash);
        Task<bool> CheckEmailIsUniq(string email);
        Task<User> AddUser(RegisterViewModel register);
        Task ChangePassword(User user, string NewPassword);
    }
}
