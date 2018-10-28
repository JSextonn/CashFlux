using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.User
{
	public class UserPostRequestHandler
		: CashFluxUserRequestHandler<
			UserPostRequest,
			UserGetRequestModel>
	{
		public UserPostRequestHandler(UserManager<CashFluxUser> userManager, SignInManager<CashFluxUser> signInManager,
			IMapper mapper) : base(userManager, signInManager, mapper) { }

		public override async Task<UserGetRequestModel> Handle(
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
			return Mapper.Map<UserGetRequestModel>(newUser);
		}
	}
}