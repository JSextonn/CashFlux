using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;
using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.Associates
{
	public class UserSourceAndSourcePostRequest
		: EntityPostRequest<FluxSource, UserSourceAndSourcePostRequestModel, SourceGetRequestModel> { }
}