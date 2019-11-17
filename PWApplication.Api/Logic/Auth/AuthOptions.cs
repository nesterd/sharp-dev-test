using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace PWApplication.Api.Logic.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "PWApplication";
        public const string AUDIENCE = "PWUser";
        const string KEY = "a8c2edd6018c4dd58585875a1c92c363";
        public const int LIFETIME = 60 * 24;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
