using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePostRequestHandler
		: CashFluxPostRequestHandler<FluxProfile, ProfilePostRequest, ProfilePostRequestModel, ProfileGetRequestModel>
	{
		public ProfilePostRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<ProfileGetRequestModel> Handle(
			ProfilePostRequest request,
			CancellationToken cancellationToken)
		{
			return await PostAsync(request.Model, cancellationToken);
		}
	}
}