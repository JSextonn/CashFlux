using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileDeleteRequestHandler 
		: CashFluxDeleteRequestHandler<FluxProfile, ProfileDeleteRequest, ProfileDeleteResult>
	{
		public ProfileDeleteRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileDeleteResult> Handle(ProfileDeleteRequest request,
			CancellationToken cancellationToken)
		{
			return await DeleteAsync(request.Id,
				cancellationToken,
				profile => profile.Fluxes);
		}

		protected override ProfileDeleteResult BuildDeleteResult(FluxProfile entity)
		{
			return new ProfileDeleteResult
			{
				ProfileId = entity.Id,
				DeletedFluxIds = entity.Fluxes.Select(flux => flux.Id)
			};
		}
	}
}