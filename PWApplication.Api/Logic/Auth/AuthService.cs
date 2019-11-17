using PWApplication.Api.ViewModels.Accounts;
using PWApplication.Domain;
using PWApplication.Repository.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PWApplication.Api.Logic.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _usersRepository;

        public AuthService(IUserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public async Task<User> GetUser(string userId)
        {
            return await _usersRepository.GetUser(userId);
        }
        public async Task<User> GetUserByEmail(string email)
        {
            return await _usersRepository.GetUserByEmail(email);
        }


        private static string GetPasswordHash(string password)
        {
            var sha256 = new SHA256Managed();
            var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
            return passwordHash;
        }

        public bool CheckPassword(string loginPassword, string dbPasswordHash)
        {
            var loginPasswordHash = GetPasswordHash(loginPassword);
            return loginPasswordHash == dbPasswordHash;
        }

        public async Task<bool> CheckEmailIsUniq(string email)
        {
            return await _usersRepository.IsEmailUniq(email);
        }

        public async Task<User> AddUser(RegisterViewModel register)
        {
            return await _usersRepository.CreateUser(register.Name, register.Email, GetPasswordHash(register.Password));
        }

        public async Task ChangePassword(User user, string newPassword)
        {
            var passwordHash = GetPasswordHash(newPassword);
            user.Password = passwordHash;

            await _usersRepository.EditUser(user);
        }
    }
}
