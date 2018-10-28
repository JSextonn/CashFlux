using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Features.Shared;
using CashFlux.Web.Features.Source;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceGetMultipleByUserIdRequestHandler
		: CashFluxRequestHandler<UserSourceGetMultipleByUserIdRequest, List<SourceGetRequestModel>>
	{
		public UserSourceGetMultipleByUserIdRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<List<SourceGetRequestModel>> Handle(
			UserSourceGetMultipleByUserIdRequest request,
			CancellationToken cancellationToken)
		{
			var sources = await Context.UserSources
				.Where(source => source.UserId == request.Model.UserId)
				.Include(uSource => uSource.Source)
				.Select(uSource => uSource.Source)
				.ToListAsync(cancellationToken);

			return Mapper.Map<List<SourceGetRequestModel>>(sources);
		}
	}
}