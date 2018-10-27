using System;
using System.Collections.Generic;
using System.Linq;
using CashFlux.Web.Errors.Models;
using Microsoft.AspNetCore.Identity;

namespace CashFlux.Web.Errors.Exceptions
{
	/// <inheritdoc cref="" />
	/// <summary>
	/// This exception is thrown when a user could not successfully be added to the database.
	/// </summary>
	public class UserCreationException : Exception, IErrorResponseConvertible
	{
		public UserCreationException(string message, IEnumerable<IdentityError> errors)
			: base(message)
		{
			Errors = errors;
		}

		public IEnumerable<IdentityError> Errors { get; }
		
		public ErrorResponse ToErrorResponse()
		{
			return new ErrorResponse
			{
				Message = Message,
				ErrorDetails = Errors.Select(e => new ErrorDetail
				{
					Message = e.Description,
					Target = e.Code
				}).ToArray()
			};
		}
	}
}