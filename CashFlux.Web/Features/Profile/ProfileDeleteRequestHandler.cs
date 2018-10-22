using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileDeleteRequestHandler : CashFluxProfileRequestHandler<ProfileDeleteRequest, ProfileDeleteResult>
	{
		public ProfileDeleteRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileDeleteResult> Handle(ProfileDeleteRequest request,
			CancellationToken cancellationToken)
		{
			var profileToDelete = await GetProfileByIdAsync(request.Id, cancellationToken);

			if (profileToDelete == null)
			{
				throw new EntityNotFoundException(typeof(FluxProfile), request.Id);
			}
			
			Context.Remove(profileToDelete);
			await Context.SaveChangesAsync(cancellationToken);

			return new ProfileDeleteResult
			{
				ProfileId = request.Id,
				DeletedFluxIds = profileToDelete.Fluxes.Select(flux => flux.Id)
			};
		}
	}
}