using CashFlux.Web.Features.Shared;
using MediatR;

namespace CashFlux.Web.Features.Flux
{
	public class FluxGetRequest : GetRequest, IRequest<FluxGetRequestModel> { }
}