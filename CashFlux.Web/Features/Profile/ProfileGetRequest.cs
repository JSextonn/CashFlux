using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetRequest : IRequest<ProfileGetRequestModel>
	{
		public string Id { get; set; }
	}
}