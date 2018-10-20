using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Exceptions;
using CashFlux.Web.Models.User;
using CashFlux.Web.Requests;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Handlers
{
	public class UserGetRequestHandler : CashFluxUserRequestHandler<UserGetRequest, UserGetRequestModel>
	{
		public UserGetRequestHandler(UserManager<CashFluxUser> userManager, SignInManager<CashFluxUser> signInManager,
			CashFluxDbContext context, IMapper mapper) : base(userManager, signInManager, context, mapper) { }

		public override async Task<UserGetRequestModel> Handle(UserGetRequest request,
			CancellationToken cancellationToken)
		{
			var user = await GetUserByIdAsync(request.Id, cancellationToken);

			if (user == null)
			{
				throw new EntityNotFoundException(typeof(CashFluxUser), request.Id);
			}

			return Mapper.Map<UserGetRequestModel>(user);
		}
	}
}