using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Models.User;
using CashFlux.Web.Requests;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Handlers
{
	public class UserCountRequestHandler : CashFluxRequestHandler<UserStatsRequest, CashFluxUserStats>
	{
		public UserCountRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<CashFluxUserStats> Handle(UserStatsRequest request,
			CancellationToken cancellationToken)
		{
			var users = Context.Users;

			return new CashFluxUserStats
			{
				UserCount = await users.CountAsync(cancellationToken)
			};
		}
	}
}