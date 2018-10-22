using MediatR;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourcePostRequest : IRequest<UserSourceGetModel>
	{
		public UserSourcePostModel Model { get; set; }
	}
}