using System;
using System.Collections.Generic;
using CashFlux.Web.Models.Flux;
using CashFlux.Web.Models.Profile;
using CashFlux.Web.Models.Source;

namespace CashFlux.Web.Models.User
{
	public class UserGetRequestModel
	{
		public string Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string FullName => $"{FirstName} {LastName}";
		public IEnumerable<FluxGetRequestModel> Fluxes { get; set; }
		public IEnumerable<ProfileGetRequestModel> Profiles { get; set; }
		public IEnumerable<SourceGetRequestModel> Sources { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}