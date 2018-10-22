using CashFlux.Web.Features.Shared;
using MediatR;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourceGetRequest : GetRequest, IRequest<UserSourceGetModel> { }
}