using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileDeleteRequest : IRequest<ProfileDeleteResult>
	{
		public string Id { get; set; }
	}
}