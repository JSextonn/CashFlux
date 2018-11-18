using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePutRequestHandler
		: CashFluxPutRequestHandler<FluxProfile, ProfilePutRequest, ProfilePutRequestModel, ProfileGetRequestModel>
	{
		public ProfilePutRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(ProfilePutRequest request,
			CancellationToken cancellationToken)
		{
			return await PutAsync(request, cancellationToken);
		}
	}
}