using System.Collections.Generic;
using CashFlux.Web.Models.Profile;
using MediatR;

namespace CashFlux.Web.Requests
{
	public class ProfileGetByUserIdRequest : IRequest<List<ProfileGetRequestModel>>
	{
		public string Id { get; set; }
	}
}