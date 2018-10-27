using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Flux
{
	public class FluxDeleteRequestHandler
		: CashFluxDeleteRequestHandler<Data.Models.Flux, FluxDeleteRequest, FluxDeleteResult>
	{
		public FluxDeleteRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<FluxDeleteResult> Handle(FluxDeleteRequest request,
			CancellationToken cancellationToken)
		{
			return await DeleteAsync(request.Id, cancellationToken);
		}

		protected override FluxDeleteResult BuildDeleteResult(Data.Models.Flux entity)
		{
			return new FluxDeleteResult
			{
				DeletedFlux = entity.Id
			};
		}
	}
}