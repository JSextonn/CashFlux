using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashFlux.Data.Models
{
	/// <summary>
	/// Represents a junction table between users and sources.
	/// </summary>
	public class UserSources : ICompositeCashFluxEntity
	{
		[Key, ForeignKey(nameof(User))]
		public string UserId { get; set; }

		public CashFluxUser User { get; set; }

		[Key, ForeignKey(nameof(Source))]
		public string SourceId { get; set; }

		public FluxSource Source { get; set; }

		[DataType(DataType.Date)]
		public DateTime TimeCreated
		{
			get => _timeCreated ?? DateTime.Now;
			set => _timeCreated = value;
		}

		private DateTime? _timeCreated;

		[NotMapped]
		public object[] Id => new object[] {UserId, SourceId};
	}
}