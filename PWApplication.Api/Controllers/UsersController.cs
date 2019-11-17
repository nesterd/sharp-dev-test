using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWApplication.Api.Logic.Users;
using PWApplication.Api.ViewModels;
using PWApplication.Api.ViewModels.Users;
using PWApplication.Repository.Repositories.Users;

namespace PWApplication.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUsersService usersService, IUserRepository userRepository, IMapper mapper)
        {
            _usersService = usersService;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [Route("info")]
        [HttpGet]
        public async Task<IActionResult> GetInfo()
        {
            var userId = User.Identity.Name;

            var info = await _usersService.GetUserInfo(userId);

            return Ok(info);
        }

        [Route("account-info")]
        [HttpGet]
        public async Task<IActionResult> GetAccountInfo()
        {
            var userId = User.Identity.Name;

            var info = await _usersService.GetUserAccountInfo(userId);

            return Ok(info);
        }

        [Route("amount")]
        [HttpGet]
        public async Task<IActionResult> GetAmount()
        {
            var userId = User.Identity.Name;
            var user = await _userRepository.GetUser(userId);

            var amount = await _userRepository.GetCurrentAmount(user);

            return Ok(amount);
        }

        [Route("recipients")]
        [HttpGet]
        public async Task<IActionResult> GetRecipientOptions()
        {
            var userId = User.Identity.Name;
            var users = await _userRepository.GetUsers(userId);

            var recipients = _mapper.Map<List<Option>>(users);

            return Ok(recipients);
        }

        [HttpPut]
        public async Task<IActionResult> EditUser([FromBody]EditUserViewModel model)
        {
            var userId = User.Identity.Name;
            var user = await _userRepository.GetUser(userId);
            user.Name = model.Name;
            await _userRepository.EditUser(user);

            return Ok();
        }
    }
}