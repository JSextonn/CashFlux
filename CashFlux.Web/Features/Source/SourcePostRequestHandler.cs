using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Source
{
	public class SourcePostRequestHandler
		: CashFluxPostRequestHandler<FluxSource,
			SourcePostRequest,
			SourcePostRequestModel,
			SourceGetRequestModel>
	{
		public SourcePostRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<SourceGetRequestModel> Handle(
			SourcePostRequest request,
			CancellationToken cancellationToken)
		{
			return await PostAsync(request.Model, cancellationToken);
		}
	}
}