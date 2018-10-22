using System;
using System.Collections.Generic;
using CashFlux.Web.Features.Flux;
using CashFlux.Web.Features.Profile;
using CashFlux.Web.Features.Source;

namespace CashFlux.Web.Features.User
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