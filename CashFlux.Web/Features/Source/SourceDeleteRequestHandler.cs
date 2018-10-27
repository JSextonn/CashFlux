using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Source
{
	public class SourceDeleteRequestHandler
		: CashFluxDeleteRequestHandler<FluxSource, SourceDeleteRequest, SourceDeleteResult>
	{
		public SourceDeleteRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<SourceDeleteResult> Handle(SourceDeleteRequest request,
			CancellationToken cancellationToken)
		{
			return await DeleteAsync(request.Id, cancellationToken);
		}

		protected override SourceDeleteResult BuildDeleteResult(FluxSource entity)
		{
			return new SourceDeleteResult
			{
				DeletedSource = entity.Id
			};
		}
	}
}