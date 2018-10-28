using System;
using System.Collections.Generic;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.UserSource;

namespace CashFlux.Web.Features.User
{
	public class UserGetRequestModel
	{
		public string Id { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string FullName => $"{FirstName} {LastName}";
		public IEnumerable<ProfileGetRequestModel> Profiles { get; set; }
		public IEnumerable<UserSourceGetRequestModel> Sources { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}