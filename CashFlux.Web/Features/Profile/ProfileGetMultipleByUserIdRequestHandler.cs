using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetMultipleByUserIdRequestHandler
		: CashFluxGetMultipleRequestHandler<FluxProfile,
			ProfileGetMultipleByUserIdRequest,
			ProfileGetMultipleByUserIdRequestModel,
			ProfileGetRequestModel>
	{
		public ProfileGetMultipleByUserIdRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		protected override async Task<List<ProfileGetRequestModel>> GetEntitiesAsync(
			Expression<Func<FluxProfile, bool>> predicate,
			CancellationToken cancellationToken,
			params Expression<Func<FluxProfile, object>>[] includes)
		{
			var entities = await Context.Set<FluxProfile>()
				.Where(predicate)
				.Include(profile => profile.Fluxes)
				.ThenInclude(flux => flux.Source)
				.ToListAsync(cancellationToken);

			return Mapper.Map<List<ProfileGetRequestModel>>(entities);
		}

		public override async Task<List<ProfileGetRequestModel>> Handle(
			ProfileGetMultipleByUserIdRequest request,
			CancellationToken cancellationToken)
		{
			return await GetEntitiesAsync(profile => profile.UserId == request.Model.UserId,
				cancellationToken);
		}
	}
}