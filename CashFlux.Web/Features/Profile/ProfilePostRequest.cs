using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePostRequest : IRequest<ProfileGetRequestModel>
	{
		public ProfilePostRequestModel Model { get; set; }
	}
}