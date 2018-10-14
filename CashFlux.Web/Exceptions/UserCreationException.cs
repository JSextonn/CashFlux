using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Exceptions
{
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