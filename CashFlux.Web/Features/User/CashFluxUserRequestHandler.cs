using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.User
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

		protected UserManager<CashFluxUser> UserManager { get; }
		protected SignInManager<CashFluxUser> SignInManager { get; }

		protected async Task<CashFluxUser> GetUserByIdAsync(string id, CancellationToken cancellationToken)
			=> await GetUserAsync(user => user.Id == id, cancellationToken);

		protected async Task<CashFluxUser> GetUserByUsernameAsync(string username,
			CancellationToken cancellationToken)
			=> await GetUserAsync(user => user.UserName == username, cancellationToken);

		private async Task<CashFluxUser> GetUserAsync(Expression<Func<CashFluxUser, bool>> predicate,
			CancellationToken cancellationToken)
		{
			return await UserManager.Users
				.Include(user => user.Profiles)
				.Include(user => user.Sources)
				.SingleOrDefaultAsync(predicate, cancellationToken);
		}
	}
}