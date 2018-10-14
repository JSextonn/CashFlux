using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Models
{
	public class UserCreationException : Exception
	{
		public UserCreationException(string Message, IEnumerable<IdentityError> errors)
			: base(Message)
		{
			Errors = errors;
		}

		public IEnumerable<IdentityError> Errors { get; }
	}
}