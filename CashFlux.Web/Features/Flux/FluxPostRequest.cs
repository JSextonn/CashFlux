using MediatR;

namespace CashFlux.Web.Features.Flux
{
	public class FluxPostRequest : IRequest<FluxGetRequestModel>
	{
		public FluxPostRequestModel Model { get; set; }
	}
}