using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Flux
{
	public class FluxDeleteMultipleRequestHandler
		: CashFluxDeleteMultipleRequestHandler<Data.Models.Flux, FluxDeleteMultipleRequest, FluxDeleteMultipleResult>
	{
		public FluxDeleteMultipleRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<FluxDeleteMultipleResult> Handle(FluxDeleteMultipleRequest request,
			CancellationToken cancellationToken)
		{
			return await DeleteMultipleAsync(request, cancellationToken);
		}

		protected override FluxDeleteMultipleResult BuildDeleteResult(IEnumerable<Data.Models.Flux> entities)
		{
			return new FluxDeleteMultipleResult
			{
				DeletedFluxes = entities.Select(flux => flux.Id)
			};
		}
	}
}