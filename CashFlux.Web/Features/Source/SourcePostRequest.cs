using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.Source
{
	public class SourcePostRequest
		: EntityPostRequest<FluxSource, SourcePostRequestModel, SourceGetRequestModel> { }
}