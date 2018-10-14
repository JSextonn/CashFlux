using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Mediator.Requests;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Mediator.Handlers
{
	public class UserCountRequestHandler : CashFluxRequestHandler<UserCountRequest, int>
	{
		public UserCountRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }
		
		public override async Task<int> Handle(UserCountRequest request, CancellationToken cancellationToken)
		{
			return await Context.Users.CountAsync(cancellationToken);
		}
	}
}