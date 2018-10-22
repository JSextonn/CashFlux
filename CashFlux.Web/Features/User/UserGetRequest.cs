using CashFlux.Web.Features.Shared;
using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserGetRequest : GetRequest, IRequest<UserGetRequestModel> { }
}