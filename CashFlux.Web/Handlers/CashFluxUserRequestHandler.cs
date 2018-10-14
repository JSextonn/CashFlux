using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Handlers
{
	public abstract class CashFluxUserRequestHandler<TRequest, TResponse> : CashFluxRequestHandler<TRequest, TResponse>
		where TRequest : IRequest<TResponse>
	{
		protected CashFluxUserRequestHandler(
			UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager,
			CashFluxDbContext context,
			IMapper mapper) : base(context, mapper)
		{
			UserManager = userManager;
			SignInManager = signInManager;
		}

		public UserManager<CashFluxUser> UserManager { get; }
		public SignInManager<CashFluxUser> SignInManager { get; }
	}
}