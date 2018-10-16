using CashFlux.Web.Models.User;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class UserStatsRequest : IRequest<CashFluxUserStats> { }
}