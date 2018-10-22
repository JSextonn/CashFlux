using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Data.Models
{
	public class CashFluxUser : IdentityUser
	{
		[MaxLength(20)]
		public string FirstName { get; set; }

		[MaxLength(20)]
		public string LastName { get; set; }

		public string FullName => $"{FirstName} {LastName}";
		public virtual ICollection<FluxProfile> Profiles { get; set; }
		public virtual ICollection<UserSources> Sources { get; set; }

		[DataType(DataType.Date)]
		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;
	}
}