using CashFlux.Web.Features.Shared;
using MediatR;

namespace CashFlux.Web.Features.Source
{
	public class SourceGetRequest : GetRequest, IRequest<SourceGetRequestModel> { }
}