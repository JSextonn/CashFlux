using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CashFlux.Data.Models;
using CashFlux.Web.Errors.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.User
{
	public abstract class CashFluxUserRequestHandler<TRequest, TResponse>
		: IRequestHandler<TRequest, TResponse>
		where TRequest : IRequest<TResponse>
	{
		protected CashFluxUserRequestHandler(
			UserManager<CashFluxUser> userManager,
			SignInManager<CashFluxUser> signInManager,
			IMapper mapper)
		{
			UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
			SignInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
			Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		protected UserManager<CashFluxUser> UserManager { get; }
		protected SignInManager<CashFluxUser> SignInManager { get; }
		protected IMapper Mapper { get; }

		public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);

		/// <summary>
		/// Attempts to find a user by id.
		/// Will throw EntityNotFoundException if nothing is found.
		/// </summary>
		/// <param name="id">The id of the user to search for</param>
		/// <param name="cancellationToken"></param>
		/// <returns>The found user</returns>
		protected async Task<CashFluxUser> GetUserByIdAsync(string id, CancellationToken cancellationToken)
		{
			return await GetUserQueryableWithIncludes()
			       .SingleOrDefaultAsync(user => user.Id == id, cancellationToken)
			       ?? throw new EntityNotFoundException(typeof(CashFluxUser), id);
		}

		/// <summary>
		/// Attempts to find a user by username.
		/// Will throw EntityNotFoundException if nothing is found.
		/// </summary>
		/// <param name="username">The username of the user to search for</param>
		/// <param name="cancellationToken"></param>
		/// <returns>The found user</returns>
		protected async Task<CashFluxUser> GetUserByUsernameAsync(string username,
			CancellationToken cancellationToken)
		{
			return await GetUserQueryableWithIncludes()
			       .SingleOrDefaultAsync(user => user.UserName == username, cancellationToken)
			       ?? throw new EntityNotFoundException(typeof(CashFluxUser), username);
		}

		/// <summary>
		/// Returns queryable able users that include fluxes and sources.
		/// </summary>
		/// <returns></returns>
		protected IQueryable<CashFluxUser> GetUserQueryableWithIncludes()
		{
			return UserManager.Users
				.Include(user => user.Profiles)
				.ThenInclude(profile => profile.Fluxes)
				.ThenInclude(flux => flux.Source)
				.Include(user => user.Sources)
				.ThenInclude(sources => sources.Source);
		}
	}
}