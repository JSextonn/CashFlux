using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetRequestHandler
		: CashFluxGetRequestHandler<FluxProfile, ProfileGetRequest, ProfileGetRequestModel>
	{
		public ProfileGetRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(
			ProfileGetRequest request,
			CancellationToken cancellationToken)
		{
			return await GetAsync(request.Id,
				cancellationToken,
				profile => profile.Fluxes);
		}
	}
}