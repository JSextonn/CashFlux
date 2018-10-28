using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceDeleteRequestHandler
		: CashFluxRequestHandler<UserSourceDeleteRequest, UserSourceDeleteResult>
	{
		public UserSourceDeleteRequestHandler(CashFluxDbContext context, IMapper mapper) 
			: base(context, mapper) { }
		
		public override async Task<UserSourceDeleteResult> Handle(UserSourceDeleteRequest request,
			CancellationToken cancellationToken)
		{
			var userSource = await Context.UserSources
				.FindAsync(request.Model.UserId, request.Model.SourceId);

			if (userSource == null)
			{
				throw new EntityNotFoundException(
					typeof(UserSources), 
					request.Model.UserId + request.Model.SourceId);
			}

			Context.UserSources.Remove(userSource);
			await Context.SaveChangesAsync(cancellationToken);

			return new UserSourceDeleteResult
			{
				UserDeleteFrom = request.Model.UserId,
				SourceDeletedFromUser = request.Model.SourceId
			};
		}
	}
}