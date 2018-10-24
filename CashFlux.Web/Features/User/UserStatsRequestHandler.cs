using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.User
{
	public class UserCountRequestHandler : CashFluxUserRequestHandler<UserStatsRequest, UserStats>
	{
		public UserCountRequestHandler(UserManager<CashFluxUser> userManager, SignInManager<CashFluxUser> signInManager,
			IMapper mapper) : base(userManager, signInManager, mapper) { }

		public override async Task<UserStats> Handle(UserStatsRequest request, CancellationToken cancellationToken)
		{
			var users = UserManager.Users;

			return new UserStats
			{
				UserCount = await users.CountAsync(cancellationToken)
			};
		}
	}
}