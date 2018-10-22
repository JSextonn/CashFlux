using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileCreateRequest : IRequest<ProfileGetRequestModel>
	{
		public ProfilePostRequestModel Model { get; set; }
	}
}