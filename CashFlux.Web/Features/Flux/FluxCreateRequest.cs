using MediatR;

namespace CashFlux.Web.Features.Flux
{
	public class FluxCreateRequest : IRequest<FluxGetRequestModel>
	{
		public FluxPostRequestModel Model { get; set; }
	}
}