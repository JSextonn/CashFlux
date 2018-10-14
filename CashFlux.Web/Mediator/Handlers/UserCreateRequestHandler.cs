using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Mediator.Requests;
using CashFlux.Web.Models;
using CashFlux.Web.Models.User;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Mediator.Handlers
{
	public class UserCreateRequestHandler : CashFluxRequestHandler<UserCreateRequest, UserGetRequestModel>
	{
		public UserCreateRequestHandler(UserManager<CashFluxUser> userManager, CashFluxDbContext context,
			IMapper mapper) : base(context, mapper)
		{
			UserManager = userManager;
		}

		public UserManager<CashFluxUser> UserManager { get; }

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