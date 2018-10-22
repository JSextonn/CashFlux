using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data.Models
{
	public class FluxSource
	{
		[Key]
		public string Id { get; set; }

		[Required]
		[MaxLength(25)]
		public string Name { get; set; }

		[Required]
		[MaxLength(25)]
		public string Category { get; set; }
		
		public virtual ICollection<UserSources> UserSources { get; set; }

		[DataType(DataType.Date)]
		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;
	}
}