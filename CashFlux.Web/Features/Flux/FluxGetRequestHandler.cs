using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Flux
{
	public class FluxGetRequestHandler : CashFluxRequestHandler<FluxGetRequest, FluxGetRequestModel>
	{
		public FluxGetRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<FluxGetRequestModel> Handle(FluxGetRequest request,
			CancellationToken cancellationToken)
		{
			var flux = await Context.Fluxes.SingleOrDefaultAsync(f => f.Id == request.Id, cancellationToken);

			if (flux == null)
			{
				throw new EntityNotFoundException(typeof(Data.Models.Flux), request.Id);
			}

			return Mapper.Map<FluxGetRequestModel>(flux);
		}
	}
}