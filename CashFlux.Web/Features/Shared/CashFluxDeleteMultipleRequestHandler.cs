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
	public abstract class CashFluxDeleteMultipleRequestHandler<TEntity, TDeleteMultipleRequest, TDeleteMultipleResult> 
		: CashFluxRequestHandler<TDeleteMultipleRequest, TDeleteMultipleResult>
		where TEntity : class, ICashFluxEntity
		where TDeleteMultipleRequest : DeleteMultipleRequest<TDeleteMultipleResult>
	{
		protected CashFluxDeleteMultipleRequestHandler(CashFluxDbContext context, IMapper mapper) 
			: base(context, mapper) { }
		
		protected virtual async Task<TDeleteMultipleResult> DeleteMultipleAsync(
			TDeleteMultipleRequest request,
			CancellationToken cancellationToken,
			params Expression<Func<TEntity, object>>[] includes)
		{
			var entitiesToDelete = await Context.Set<TEntity>()
				.Includes(includes)
				.Where(entity => request.Ids.Contains(entity.Id))
				.ToListAsync(cancellationToken);
			
			// Important to build result before deleting.
			// Otherwise result data will be lost.
			var deleteResult = BuildDeleteResult(entitiesToDelete);

			Context.RemoveRange(entitiesToDelete);
			await Context.SaveChangesAsync(cancellationToken);

			return deleteResult;
		}
		
		protected abstract TDeleteMultipleResult BuildDeleteResult(IEnumerable<TEntity> entities);
	}
}