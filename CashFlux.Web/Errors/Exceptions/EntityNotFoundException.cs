using System;
using System.Reflection;
using CashFlux.Web.Errors.Models;

namespace CashFlux.Web.Errors.Exceptions
{
	/// <inheritdoc cref="" />
	/// <summary>
	/// This exception is thrown when an entity could not be found in a collection.
	/// </summary>
	public class EntityNotFoundException : Exception, IErrorResponseConvertible
	{
		public EntityNotFoundException(MemberInfo memberInfo, string id)
			: base($"An {memberInfo.Name} with ID {id} was not found.")
		{
			TypeName = memberInfo.Name;
			Id = id;
		}

		public string TypeName { get; }
		public string Id { get; }

		public ErrorResponse ToErrorResponse()
		{
			return new ErrorResponse
			{
				Message = Message
			};
		}
	}
}