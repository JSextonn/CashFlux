using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;
using CashFlux.Web.Features.Source;
using CashFlux.Web.Features.UserSource;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Associates
{
	public class UserSourceAndSourcePostRequestHandler
		: CashFluxPostRequestHandler<FluxSource,
			UserSourceAndSourcePostRequest,
			UserSourceAndSourcePostRequestModel,
			SourceGetRequestModel
		>
	{
		public UserSourceAndSourcePostRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		public override async Task<SourceGetRequestModel> Handle(UserSourceAndSourcePostRequest request,
			CancellationToken cancellationToken)
		{
			var existingSource = await Context.Sources.SingleOrDefaultAsync(
				source => source.Name == request.Model.Name && source.Category == request.Model.Category,
				cancellationToken);

			// If the source did not exist, create it
			var selectedSource = existingSource == null
				? await PostAsync(request.Model, cancellationToken)
				: Mapper.Map<SourceGetRequestModel>(existingSource);

			// Assign the newly created source to the specified user.
			var userSources = Mapper.Map<UserSources>(new UserSourcePostRequestModel
			{
				SourceId = selectedSource.Id,
				UserId = request.Model.UserId
			});
			await Context.UserSources.AddAsync(userSources, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);

			return selectedSource;
		}
	}
}