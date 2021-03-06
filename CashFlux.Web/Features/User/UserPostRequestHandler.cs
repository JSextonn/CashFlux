using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Validation;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.User
{
	public class UserPostRequestHandler
		: CashFluxUserRequestHandler<
			UserPostRequest,
			UserPostRequestResponseModel>
	{
		public UserPostRequestHandler(JwtTokenService tokenService, UserManager<CashFluxUser> userManager, SignInManager<CashFluxUser> signInManager,
			IMapper mapper) : base(userManager, signInManager, mapper)
		{
			TokenService = tokenService;
		}
		
		public JwtTokenService TokenService { get; }

		public override async Task<UserPostRequestResponseModel> Handle(
			UserPostRequest request,
			CancellationToken cancellationToken)
		{
			var newUser = Mapper.Map<CashFluxUser>(request.Model);
			var result = await UserManager.CreateAsync(newUser, request.Model.Password);

			if (!result.Succeeded)
			{
				throw new UserCreationException(
					"Failed to create user with given credentials.",
					result.Errors);
			}

			return new UserPostRequestResponseModel
			{
				UserId = newUser.Id,
				Token = TokenService.GetToken(newUser.UserName),
				UserDetails = request.Model.IncludeUserDetails ? Mapper.Map<UserGetRequestModel>(newUser): null
			};
		}
	}
}