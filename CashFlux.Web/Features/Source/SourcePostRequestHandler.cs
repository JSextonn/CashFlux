using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;
using Microsoft.EntityFrameworkCore;

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
			var existingSource = await Context.Sources.SingleOrDefaultAsync(
				source => source.Name == request.Model.Name && source.Category == request.Model.Category,
				cancellationToken);

			return existingSource == null
				? await PostAsync(request.Model, cancellationToken)
				: Mapper.Map<SourceGetRequestModel>(existingSource);
		}
	}
}