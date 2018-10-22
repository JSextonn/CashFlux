using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.User
{
	public class UserDeleteRequestHandler : CashFluxUserRequestHandler<UserDeleteRequest, UserDeleteResult>
	{
		public UserDeleteRequestHandler(UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager, CashFluxDbContext context, IMapper mapper) : base(userManager,
			signInManager, context, mapper) { }

		public override async Task<UserDeleteResult> Handle(UserDeleteRequest request,
			CancellationToken cancellationToken)
		{
			var objectToRemove = await GetUserByIdAsync(request.Id, cancellationToken);

			if (objectToRemove == null)
			{
				throw new EntityNotFoundException(typeof(CashFluxUser), request.Id);
			}

			Context.Remove(objectToRemove);
			await Context.SaveChangesAsync(cancellationToken);

			return new UserDeleteResult
			{
				UserId = objectToRemove.Id,
				DeletedProfiles = objectToRemove.Profiles.Select(profile => profile.Id),
				DeletedFluxes = objectToRemove.Profiles.SelectMany(profile => profile.Fluxes.Select(flux => flux.Id))
			};
		}
	}
}