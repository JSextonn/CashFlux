using System;
using System.Collections.Generic;
using CashFlux.Data.Models;

namespace CashFlux.Web.Models.User
{
	public class UserGetRequestModel
	{
		public string Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string FullName => $"{FirstName} {LastName}";
		public IEnumerable<Flux> Fluxes { get; set; }
		public IEnumerable<FluxProfile> Profiles { get; set; }
		public IEnumerable<FluxSource> Sources { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}