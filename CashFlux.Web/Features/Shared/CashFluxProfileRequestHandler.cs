using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxProfileRequestHandler<TRequest, TResponse>
		: CashFluxRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
	{
		protected CashFluxProfileRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		protected async Task<FluxProfile> GetProfileByIdAsync(string id, CancellationToken cancellationToken)
		{
			return await Context.Profiles
				.Include(p => p.Fluxes)
				.SingleOrDefaultAsync(p => p.Id == id, cancellationToken);
		}

		protected async Task<List<FluxProfile>> GetProfilesByUsernameAsync(string username,
			CancellationToken cancellationToken)
			=> await GetProfilesAsync(p => p.User.UserName == username, cancellationToken);

		protected async Task<List<FluxProfile>> GetProfilesByUserIdAsync(string id,
			CancellationToken cancellationToken)
			=> await GetProfilesAsync(p => p.UserFk == id, cancellationToken);

		private async Task<List<FluxProfile>> GetProfilesAsync(Expression<Func<FluxProfile, bool>> predicate,
			CancellationToken cancellationToken)
		{
			return await Context.Profiles
				.Include(p => p.Fluxes)
				.Where(predicate)
				.ToListAsync(cancellationToken);
		}
	}
}