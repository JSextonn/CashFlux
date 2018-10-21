using CashFlux.Web.Models.Profile;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class ProfileGetRequest : IRequest<ProfileGetRequestModel>
	{
		public string Id { get; set; }
	}
}