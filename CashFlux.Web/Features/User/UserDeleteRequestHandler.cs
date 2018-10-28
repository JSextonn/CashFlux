using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.User
{
	public class
		UserDeleteRequestHandler : CashFluxUserRequestHandler<UserDeleteRequest, UserDeleteResult>
	{
		public UserDeleteRequestHandler(UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager, IMapper mapper)
			: base(userManager, signInManager, mapper) { }

		public override async Task<UserDeleteResult> Handle(
			UserDeleteRequest request,
			CancellationToken cancellationToken)
		{
			var userToDelete = await GetUserByIdAsync(request.Id, cancellationToken);
			await UserManager.DeleteAsync(userToDelete);

			return new UserDeleteResult
			{
				DeletedUser = userToDelete.Id,
				DeletedProfiles = userToDelete.Profiles.Select(profile => profile.Id),
				DeletedFluxes = userToDelete.Profiles
					.SelectMany(profile => profile.Fluxes.Select(flux => flux.Id))
			};
		}
	}
}