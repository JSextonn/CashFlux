using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data.Models
{
	public class FluxProfile
	{
		[Key]
		public string Id { get; set; }

		[Required]
		[MaxLength(30)]
		public string Name { get; set; }

		public virtual ICollection<Flux> Fluxes { get; set; }

		[ForeignKey(nameof(User))]
		public string UserFk { get; set; }

		public virtual CashFluxUser User { get; set; }

		[DataType(DataType.Date)]
		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;
	}
}