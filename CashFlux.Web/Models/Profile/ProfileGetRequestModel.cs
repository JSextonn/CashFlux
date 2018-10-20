using System;
using System.Collections.Generic;
using CashFlux.Web.Models.Flux;

namespace CashFlux.Web.Models.Profile
{
	public class ProfileGetRequestModel
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public IEnumerable<FluxGetRequestModel> Fluxes { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}