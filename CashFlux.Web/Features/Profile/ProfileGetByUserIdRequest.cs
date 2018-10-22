using System.Collections.Generic;
using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetByUserIdRequest : IRequest<List<ProfileGetRequestModel>>
	{
		public string Id { get; set; }
	}
}