using CashFlux.Web.Models.Profile;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class ProfileCreateRequest : IRequest<ProfileGetRequestModel>
	{
		public ProfilePostRequestModel Model { get; set; }
	}
}