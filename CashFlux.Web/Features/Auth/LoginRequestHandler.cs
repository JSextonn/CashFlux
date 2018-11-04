using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.User;
using CashFlux.Web.Validation;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.Auth
{
	public class LoginRequestHandler
		: CashFluxUserRequestHandler<LoginRequest, LoginResult>
	{
		public LoginRequestHandler(JwtTokenService tokenService,
			UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager,
			IMapper mapper) : base(userManager, signInManager, mapper)
		{
			TokenService = tokenService;
		}
		
		public JwtTokenService TokenService { get; }

		public override async Task<LoginResult> Handle(LoginRequest request, CancellationToken cancellationToken)
		{
			// Obtain the user object by unique username
			// Throws entity not found exception if no user exists with given username
			var user = await GetUserByUsernameAsync(request.Model.Username, cancellationToken);

			// Validate given password
			var result = await SignInManager.CheckPasswordSignInAsync(
				user,
				request.Model.Password,
				false
			);

			if (!result.Succeeded)
			{
				// Defaults to failed login result
				throw new FailedAuthenticationException();
			}

			// Return successful login attempt with token
			return new LoginResult
			{
				Token = TokenService.GetToken(request.Model.Username),
				UserId = user.Id
			};
		}
	}
}