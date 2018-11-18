using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CashFlux.Data;
using CashFlux.Web.Errors.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace CashFlux.Web.Features.Shared
{
	public abstract class CashFluxPutRequestHandler<TEntity, TPutRequest, TPutModel, TGetModel>
		: CashFluxRequestHandler<TPutRequest, TGetModel>
		where TEntity : class, ICashFluxEntity
		where TPutRequest : PutRequest<TEntity, TPutModel, TGetModel>
	{
		protected CashFluxPutRequestHandler(CashFluxDbContext context, IMapper mapper) : base(context, mapper) { }

		protected async Task<TGetModel> PutAsync(TPutRequest request, CancellationToken cancellationToken)
		{
			var entity = await Context.Set<TEntity>()
				.SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

			if (entity == null)
			{
				throw new EntityNotFoundException(typeof(TEntity), request.Id);
			}


			var properties = typeof(TPutModel).GetProperties();
			foreach (var property in properties)
			{
				var value = property.GetValue(request.Model, null);
				if (value == null)
				{
					continue;
				}

				var entityProperty = typeof(TEntity).GetProperty(property.Name);
				entityProperty.SetValue(entity, value, null);
			}

			await Context.SaveChangesAsync(cancellationToken);
			return Mapper.Map<TGetModel>(entity);
		}
	}
}