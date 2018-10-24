using MediatR;

namespace CashFlux.Web.Features.Shared
{
	public abstract class DeleteRequest<TDeleteResult> : IRequest<TDeleteResult>
	{
		public string Id { get; set; }
	}
}