using System.Collections.Generic;
using MediatR;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetByUsernameRequest : IRequest<List<ProfileGetRequestModel>>
	{
		public string Username { get; set; }
	}
}