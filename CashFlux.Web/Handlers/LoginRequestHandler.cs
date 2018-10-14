using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Exceptions;
using CashFlux.Web.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CashFlux.Web.Handlers
{
	public class LoginRequestHandler : CashFluxUserRequestHandler<LoginRequest, string>
	{
		public LoginRequestHandler(
			IConfiguration configuration,
			UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager,
			CashFluxDbContext context,
			IMapper mapper) : base(userManager, signInManager, context, mapper)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public override async Task<string> Handle(LoginRequest request, CancellationToken cancellationToken)
		{
			var result = await SignInManager.PasswordSignInAsync(
				request.Model.Username,
				request.Model.Password,
				false, false
			);

			if (!result.Succeeded)
			{
				throw new FailedLoginException("Authentication attempt failed");
			}

			// Build collection of claims
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
				new Claim(JwtRegisteredClaimNames.NameId, request.Model.Username)
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

			// Return Jwt string
			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}