using System.Collections.Generic;
using CashFlux.Web.Models.Profile;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class ProfileGetByUsernameRequest : IRequest<List<ProfileGetRequestModel>>
	{
		public string Username { get; set; }
	}
}