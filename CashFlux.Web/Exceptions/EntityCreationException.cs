using System;

namespace CashFlux.Web.Exceptions
{
	public class EntityCreationException : Exception
	{
		public EntityCreationException(string message): base(message) { }
	}
}