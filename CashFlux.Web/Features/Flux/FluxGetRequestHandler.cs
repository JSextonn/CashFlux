using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Flux
{
	public class FluxGetRequestHandler 
		: CashFluxGetRequestHandler<Data.Models.Flux, FluxGetRequest, FluxGetRequestModel>
	{
		public FluxGetRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<FluxGetRequestModel> Handle(FluxGetRequest request,
			CancellationToken cancellationToken)
		{
			return await GetAsync(request.Id,
				cancellationToken,
				flux => flux.Source);
		}
	}
}