using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class GetRequest<TGetModel> : IRequest<TGetModel>
	{
		public string Id { get; set; }
	}
}