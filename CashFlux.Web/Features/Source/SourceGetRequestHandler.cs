using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Source
{
	public class SourceGetRequestHandler
		: CashFluxGetRequestHandler<FluxSource, SourceGetRequest, SourceGetRequestModel>
	{
		public SourceGetRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<SourceGetRequestModel> Handle(
			SourceGetRequest request,
			CancellationToken cancellationToken)
		{
			return await GetAsync(request.Id, cancellationToken);
		}
	}
}