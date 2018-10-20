using System;

namespace CashFlux.Web.Models.Source
{
	public class SourceGetRequestModel
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Category { get; set; }
		public DateTime TimeCreated { get; set; }
	}
}