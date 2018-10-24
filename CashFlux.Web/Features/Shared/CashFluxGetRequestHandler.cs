using System;
using System.Linq;
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
	public abstract class CashFluxGetRequestHandler<TEntity, TGetRequest, TGetModel>
		: CashFluxRequestHandler<TGetRequest, TGetModel>
		where TEntity : class, ICashFluxEntity
		where TGetRequest : GetRequest<TGetModel>
	{
		protected CashFluxGetRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		protected async Task<TGetModel> GetAsync(string id,
			CancellationToken cancellationToken,
			params Expression<Func<TEntity, object>>[] includes)
		{
			var entity = await Context.Set<TEntity>()
				.Where(e => e.Id == id)
				.Includes(includes)
				.FirstOrDefaultAsync(cancellationToken);

			if (entity == null)
			{
				throw new EntityNotFoundException(typeof(TEntity), id);
			}

			return Mapper.Map<TGetModel>(entity);
		}
	}
}