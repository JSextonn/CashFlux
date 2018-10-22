using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CashFlux.Web.Features.Auth
{
	public class LoginRequestHandler : CashFluxUserRequestHandler<LoginRequest, LoginResult>
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

		public override async Task<LoginResult> Handle(LoginRequest request, CancellationToken cancellationToken)
		{
			// Obtain the user object by unique username
			var user = await GetUserByUsernameAsync(request.Model.Username, cancellationToken);

			if (user == null)
			{
				throw new EntityNotFoundException(typeof(CashFluxUser), request.Model.Username);
			}

			// Validate given password
			var result = await SignInManager.CheckPasswordSignInAsync(
				user,
				request.Model.Password,
				false
			);

			if (!result.Succeeded)
			{
				throw new FailedLoginException();
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

			// Return successful login attempt with token
			return new LoginResult
			{
				Token = new JwtSecurityTokenHandler().WriteToken(token)
			};
		}
	}
}