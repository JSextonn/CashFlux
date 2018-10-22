using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Source
{
	public class SourceCreateRequestHandler : CashFluxRequestHandler<SourceCreateRequest, SourceGetRequestModel>
	{
		public SourceCreateRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<SourceGetRequestModel> Handle(SourceCreateRequest request,
			CancellationToken cancellationToken)
		{
			var newEntity = Mapper.Map<FluxSource>(request.Model);
			await Context.AddAsync(newEntity, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);
			return Mapper.Map<SourceGetRequestModel>(newEntity);
		}
	}
}