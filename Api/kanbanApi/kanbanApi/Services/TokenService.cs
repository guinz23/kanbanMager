using kanbanApi.Model;
using kanbanApi.Model.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace kanbanApi.Services
{
    public class TokenService
    {
        public static AuthenticateViewModel GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name.ToString()),
                    new Claim(ClaimTypes.Role, user.IdUserTypeNavigation.Type.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var _authenticateViewModel = new AuthenticateViewModel {
              Id=user.Id,
              Email= user.Email,
              Name= user.Name,
              LastName= user.LastName,
              Token = tokenHandler.WriteToken(token),
              Role =user.IdUserTypeNavigation.Type.ToString()
        };
            return _authenticateViewModel;
        }
    }
}
