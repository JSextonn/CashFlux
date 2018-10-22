using System.Collections.Generic;
using CashFlux.Web.Features.Shared;
using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetByUserIdRequest : GetRequest, IRequest<List<ProfileGetRequestModel>> { }
}