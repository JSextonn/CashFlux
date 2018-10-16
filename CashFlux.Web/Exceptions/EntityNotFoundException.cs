using System;
using System.Reflection;

namespace CashFlux.Web.Exceptions
{
	/// <inheritdoc />
	/// <summary>
	/// This exception is thrown when an entity could not be found in a collection.
	/// </summary>
	public class EntityNotFoundException : Exception
	{
		public EntityNotFoundException(MemberInfo entityType, int id)
			: base($"An {entityType.Name} with ID {id} was not found.") { }

		public EntityNotFoundException(MemberInfo entityType, string id)
			: base($"An {entityType.Name} with ID {id} was not found.") { }
	}
}