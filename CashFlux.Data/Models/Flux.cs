using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data.Models
{
	public class Flux : ICashFluxEntity
	{
		[Key]
		public string Id { get; set; }

		[Required]
		[DataType(DataType.Currency)]
		[Column(TypeName = "money")]
		public decimal Amount { get; set; }

		[Required]
		[ForeignKey(nameof(Source))]
		public string SourceId { get; set; }

		public virtual FluxSource Source { get; set; }

		[Required]
		[ForeignKey(nameof(Profile))]
		public string ProfileId { get; set; }

		public virtual FluxProfile Profile { get; set; }
		
		[Required]
		[DataType(DataType.Date)]
		public DateTime TimeOccurred { get; set; }

		[DataType(DataType.Date)]
		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;
	}
}