using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Exceptions;
using CashFlux.Web.Models.User;
using CashFlux.Web.Requests;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Handlers
{
	public class UserGetRequestHandler : CashFluxRequestHandler<UserGetRequest, UserGetRequestModel>
	{
		public UserGetRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		public override async Task<UserGetRequestModel> Handle(UserGetRequest request,
			CancellationToken cancellationToken)
		{
			var user = await Context.Users
				.SingleOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

			if (user == null)
			{
				throw new EntityNotFoundException(typeof(CashFluxUser), request.Id);
			}

			return Mapper.Map<UserGetRequestModel>(user);
		}
	}
}