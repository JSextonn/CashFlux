using CashFlux.Data;
using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class PutRequest<TEntity, TPutModel, TGetModel> : IRequest<TGetModel>
		where TEntity : class, ICashFluxEntity
	{
		public string Id { get; set; }
		public TPutModel Model { get; set; }
	}
}