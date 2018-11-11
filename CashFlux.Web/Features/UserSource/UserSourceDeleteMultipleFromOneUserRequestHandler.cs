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
	public class UserSourceDeleteMultipleFromOneUserRequestHandler
		: CashFluxRequestHandler<UserSourceDeleteMultipleFromOneUserRequest,
			UserSourceDeleteMultipleFromOneUserRequestResult>
	{
		public UserSourceDeleteMultipleFromOneUserRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<UserSourceDeleteMultipleFromOneUserRequestResult> Handle(
			UserSourceDeleteMultipleFromOneUserRequest request,
			CancellationToken cancellationToken)
		{
			var sourcesToRemoveFromUser = await Context.UserSources
				.Include(uSource => uSource.Source)
				.Where(uSource => uSource.UserId == request.Model.UserId)
				.Where(uSource => request.Model.SourceIds.Contains(uSource.SourceId))
				.ToListAsync(cancellationToken);

			var result = new UserSourceDeleteMultipleFromOneUserRequestResult
			{
				UserId = request.Model.UserId,
				SourcesDeletedFromUser =
					sourcesToRemoveFromUser.Select(uSource => Mapper.Map<SourceGetRequestModel>(uSource.Source))
			};

			Context.RemoveRange(sourcesToRemoveFromUser);
			await Context.SaveChangesAsync(cancellationToken);

			return result;
		}
	}
}