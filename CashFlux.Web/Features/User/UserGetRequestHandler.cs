using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Features.Shared;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Features.User
{
	public class
		UserGetRequestHandler : CashFluxUserRequestHandler<UserGetRequest, UserGetRequestModel>
	{
		public UserGetRequestHandler(UserManager<CashFluxUser> userManager, SignInManager<CashFluxUser> signInManager,
			IMapper mapper) : base(userManager, signInManager, mapper) { }

		public override async Task<UserGetRequestModel> Handle(
			UserGetRequest request,
			CancellationToken cancellationToken)
		{
			var user = await GetUserByIdAsync(request.Id, cancellationToken);
			return Mapper.Map<UserGetRequestModel>(user);
		}
	}
}