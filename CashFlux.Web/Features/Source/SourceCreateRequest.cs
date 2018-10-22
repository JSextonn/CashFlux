using MediatR;

namespace CashFlux.Web.Features.Source
{
	public class SourceCreateRequest : IRequest<SourceGetRequestModel>
	{
		public SourcePostRequestModel Model { get; set; }
	}
}