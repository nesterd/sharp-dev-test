using PWApplication.Api.ViewModels.Users;
using PWApplication.Repository.Repositories.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Logic.Users
{
    public class UsersService : IUsersService
    {
        private readonly IUserRepository _userRepository;        

        public UsersService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        //public async Task<decimal> GetCurrentAmount(string userId)
        //{
        //    return await _userRepository.GetCurrentAmount(userId);
        //}

        public async Task<UserInfoViewModel> GetUserInfo(string userId)
        {
            var user = await _userRepository.GetUser(userId);
            var amount = await _userRepository.GetCurrentAmount(user);
            return new UserInfoViewModel
            {
                Name = user.Name,
                CurrentAmount = amount
            };
        }

        public async Task<UserInfoViewModel> GetUserAccountInfo(string userId)
        {
            var user = await _userRepository.GetUser(userId);
            var amount = await _userRepository.GetCurrentAmount(user);
            return new UserAccountInfoViewModel
            {
                Email = user.Email,
                Name = user.Name,
                CurrentAmount = amount
            };
        }
    }
}
