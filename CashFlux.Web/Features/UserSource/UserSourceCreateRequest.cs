using MediatR;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceCreateRequest : IRequest<UserSourceGetModel>
	{
		public UserSourcePostModel Model { get; set; }
	}
}