using MediatR;

namespace CashFlux.Web.Features.User
{
	public class UserStatsRequest : IRequest<CashFluxUserStats> { }
}