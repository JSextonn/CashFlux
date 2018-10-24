using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Extensions;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxDeleteRequestHandler<TEntity, TDeleteRequest, TDeleteResult>
		: CashFluxRequestHandler<TDeleteRequest, TDeleteResult>
		where TEntity : class, ICashFluxEntity
		where TDeleteRequest : DeleteRequest<TDeleteResult>
	{
		protected CashFluxDeleteRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		protected async Task<TDeleteResult> DeleteAsync(string id,
			CancellationToken cancellationToken,
			params Expression<Func<TEntity, object>>[] includes)
		{
			var entityToDelete =
				await Context.Set<TEntity>()
					.Includes(includes)
					.SingleOrDefaultAsync(e => e.Id == id, cancellationToken);

			if (entityToDelete == null)
			{
				throw new EntityNotFoundException(typeof(TEntity), id);
			}

			// Important to build result before deleting.
			// Otherwise result data will be lost.
			var deleteResult = BuildDeleteResult(entityToDelete);

			Context.Remove(entityToDelete);
			await Context.SaveChangesAsync(cancellationToken);

			return deleteResult;
		}

		protected abstract TDeleteResult BuildDeleteResult(TEntity entity);
	}
}