using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PWApplication.Api.Logic.Auth;
using PWApplication.Api.ViewModels.Accounts;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PWApplication.Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginViewModel login)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _authService.GetUserByEmail(login.Email);
            if (user == null)
                return BadRequest(new { email = new[] { "Invalid username." } });
            if (!_authService.CheckPassword(login.Password, user.Password))
                return BadRequest(new { password = new[] { "Invalid password." } });

            return SignIn(user.Id);
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel register)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isEmailUniq = await _authService.CheckEmailIsUniq(register.Email);
            if (!isEmailUniq)
                return BadRequest(new { email = new[] { "User with this email already exists." } });

            var user = await _authService.AddUser(register);

            return SignIn(user.Id);
        }

        [Authorize]
        [Route("password")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.Identity.Name;
            var user = await _authService.GetUser(userId);

            if (!_authService.CheckPassword(model.OldPassword, user.Password))
                return BadRequest(new { password = new[] { "Invalid old password." } });
            if (model.NewPassword == model.OldPassword)
                return BadRequest(new { password = new[] { "New and Old password must be different." } });

            await _authService.ChangePassword(user, model.NewPassword);
            return Ok();
        }

        private IActionResult SignIn(string userId)
        {
            var identity = GetIdentity(userId);
            var token = GetToken(identity.Claims);

            return Ok(new { access_token = token });
        }


        private string GetToken(IEnumerable<Claim> claims)
        {
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        private ClaimsIdentity GetIdentity(string userId)
        {
            var claims = new[]
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userId)
            };

            return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        }
    }
}
