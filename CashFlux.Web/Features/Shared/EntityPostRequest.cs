using CashFlux.Data;
using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class EntityPostRequest<TEntity, TPostModel, TGetModel> : IRequest<TGetModel>
		where TEntity : class, ICashFluxEntity
	{
		public TPostModel Model { get; set; }
	}
}