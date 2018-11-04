using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CashFlux.Web.Validation
{
	public class JwtTokenService
	{
		public JwtTokenService(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public string GetToken(string username)
		{
			// Build collection of claims
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
				new Claim(JwtRegisteredClaimNames.NameId, username)
			};

			// Create signing credentials
			var credentials = new SigningCredentials(
				new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
				SecurityAlgorithms.HmacSha256
			);

			// Create Jwt
			var token = new JwtSecurityToken(
				Configuration["Jwt:Issuer"],
				Configuration["Jwt:Audience"],
				claims,
				expires: DateTime.Now.AddMonths(1),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}