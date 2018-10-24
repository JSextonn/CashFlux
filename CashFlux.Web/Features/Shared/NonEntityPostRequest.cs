using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class NonEntityPostRequest<TPostModel, TGetModel> : IRequest<TGetModel>
	{
		public TPostModel Model { get; set; }
	}
}