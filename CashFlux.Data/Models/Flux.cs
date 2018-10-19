using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data.Models
{
	public class Flux
	{
		[Key]
		public string Id { get; set; }

		[Column(TypeName = "decimal(18,2)")]
		public decimal Amount { get; set; }

		[ForeignKey(nameof(Source))]
		public string SourceFk { get; set; }

		public virtual FluxSource Source { get; set; }

		[ForeignKey(nameof(Profile))]
		public string ProfileFk { get; set; }

		public virtual FluxProfile Profile { get; set; }

		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;
	}
}