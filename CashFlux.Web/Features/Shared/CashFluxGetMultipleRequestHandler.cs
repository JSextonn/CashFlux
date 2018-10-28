using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxGetMultipleRequestHandler<TEntity, TGetMultipleRequest, TGetMultipleModel, TGetModel>
		: CashFluxRequestHandler<TGetMultipleRequest, List<TGetModel>>
		where TEntity : class, ICashFluxEntity
		where TGetMultipleRequest : GetMultipleRequest<TGetMultipleModel, TGetModel>
	{
		protected CashFluxGetMultipleRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		protected virtual async Task<List<TGetModel>> GetEntitiesAsync(
			Expression<Func<TEntity, bool>> predicate,
			CancellationToken cancellationToken,
			params Expression<Func<TEntity, object>>[] includes)
		{
			var entities = await Context.Set<TEntity>()
				.Where(predicate)
				.Includes(includes)
				.ToListAsync(cancellationToken);

			return Mapper.Map<List<TGetModel>>(entities);
		}
	}
}