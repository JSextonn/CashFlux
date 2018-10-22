using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Source
{
	public class SourceGetRequestHandler : CashFluxRequestHandler<SourceGetRequest, SourceGetRequestModel>
	{
		public SourceGetRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<SourceGetRequestModel> Handle(SourceGetRequest request,
			CancellationToken cancellationToken)
		{
			var source =
				await Context.Sources
					.SingleOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

			if (source == null)
			{
				throw new EntityNotFoundException(typeof(FluxSource), request.Id);
			}

			return Mapper.Map<SourceGetRequestModel>(source);
		}
	}
}