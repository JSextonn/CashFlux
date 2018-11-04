using CashFlux.Data.Models;
using CashFlux.Web.Features.Shared;

namespace CashFlux.Web.Features.User
{
	public class UserPostRequest : EntityPostRequest<CashFluxUser, UserPostRequestModel, UserRegisterRequestModel> { }
}