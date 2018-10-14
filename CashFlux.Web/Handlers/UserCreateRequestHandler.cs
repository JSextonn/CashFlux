using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Exceptions;
using CashFlux.Web.Models.User;
using CashFlux.Web.Requests;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Handlers
{
	public class UserCreateRequestHandler : CashFluxUserRequestHandler<UserCreateRequest, UserGetRequestModel>
	{
		public UserCreateRequestHandler(
			UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager,
			CashFluxDbContext context,
			IMapper mapper) : base(userManager, signInManager, context, mapper) { }

		public override async Task<UserGetRequestModel> Handle(UserCreateRequest request,
			CancellationToken cancellationToken)
		{
			var newEntity = Mapper.Map<CashFluxUser>(request.Model);
			var result = await UserManager.CreateAsync(newEntity, request.Model.Password);

			if (result.Errors.Any())
			{
				throw new UserCreationException(
					"There was a problem when creating a new user account with the proposed credentials",
					result.Errors);
			}

			return Mapper.Map<UserGetRequestModel>(newEntity);
		}
	}
}