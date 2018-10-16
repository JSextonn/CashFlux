using System;

namespace CashFlux.Web.Exceptions
{
	/// <inheritdoc />
	/// <summary>
	/// This exception is thrown when a generic entity could not be created successfully.
	/// </summary>
	public class EntityCreationException : Exception
	{
		public EntityCreationException() : base("Entity was not successfully created") { }
	}
}