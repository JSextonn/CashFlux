using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Errors.Exceptions
{
	/// <inheritdoc />
	/// <summary>
	/// This exception is thrown when a user could not successfully be added to the database.
	/// </summary>
	public class UserCreationException : Exception
	{
		public UserCreationException(string message, IEnumerable<IdentityError> errors)
			: base(message)
		{
			Errors = errors;
		}

		public IEnumerable<IdentityError> Errors { get; }
	}
}