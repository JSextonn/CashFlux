using System;
using System.Collections.Generic;
using CashFlux.Web.Features.Flux;

namespace CashFlux.Web.Features.Profile
{
	public class ProfileGetRequestModel
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public IEnumerable<FluxGetRequestModel> Fluxes { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}