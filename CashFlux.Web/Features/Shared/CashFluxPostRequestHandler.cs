using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxPostRequestHandler<TEntity, TPostRequest, TPostModel, TGetModel>
		: CashFluxRequestHandler<TPostRequest, TGetModel>
		where TEntity : class, ICashFluxEntity
		where TPostRequest : EntityPostRequest<TEntity, TPostModel, TGetModel>
	{
		protected CashFluxPostRequestHandler(CashFluxDbContext context, IMapper mapper)
			: base(context, mapper) { }

		protected async Task<TGetModel> PostAsync(TPostModel model, CancellationToken cancellationToken)
		{
			var newEntity = Mapper.Map<TEntity>(model);
			await Context.Set<TEntity>().AddAsync(newEntity, cancellationToken);
			await Context.SaveChangesAsync(cancellationToken);
			await LoadReferencesAsync(newEntity);
			return Mapper.Map<TGetModel>(newEntity);
		}

		/// <summary>
		/// Override when the created entity should load virtual references.
		/// </summary>
		/// <param name="newEntity">The new entity that needs lazily loaded objects</param>
		protected virtual Task LoadReferencesAsync(TEntity newEntity) => Task.CompletedTask;
	}
}