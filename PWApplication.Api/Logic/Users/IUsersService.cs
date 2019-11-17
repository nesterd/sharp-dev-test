using PWApplication.Api.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWApplication.Api.Logic.Users
{
    public interface IUsersService
    {
        Task<UserInfoViewModel> GetUserInfo(string userId);
        Task<UserInfoViewModel> GetUserAccountInfo(string userId);
    }
}
