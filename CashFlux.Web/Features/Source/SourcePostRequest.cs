using MediatR;

namespace CashFlux.Web.Features.Source
{
	public class SourcePostRequest : IRequest<SourceGetRequestModel>
	{
		public SourcePostRequestModel Model { get; set; }
	}
}