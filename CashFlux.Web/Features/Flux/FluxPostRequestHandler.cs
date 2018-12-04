using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Flux
{
	public class FluxPostRequestHandler
		: CashFluxPostRequestHandler<
			Data.Models.Flux, FluxPostRequest,
			FluxPostRequestModel,
			FluxGetRequestModel>
	{
		public FluxPostRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<FluxGetRequestModel> Handle(FluxPostRequest request,
			CancellationToken cancellationToken)
		{
			return await PostAsync(request.Model, cancellationToken);
		}

		protected override async Task LoadReferencesAsync(Data.Models.Flux newFlux)
		{
			await Context.Entry(newFlux).Reference(flux => flux.Source).LoadAsync();
		}
	}
}