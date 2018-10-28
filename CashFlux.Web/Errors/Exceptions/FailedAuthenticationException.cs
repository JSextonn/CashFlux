using System;
using CashFlux.Web.Errors.Models;

namespace CashFlux.Web.Errors.Exceptions
{
	public class FailedAuthenticationException : Exception, IErrorResponseConvertible
	{
		public FailedAuthenticationException()
			: base("Authentication failed with given credentials") { }

		public ErrorResponse ToErrorResponse()
		{
			return new ErrorResponse
			{
				Message = Message,
				ErrorDetails = new[]
				{
					new ErrorDetail
					{
						Message = "Either the username or password was not correct",
						Target = "Username or Password"
					}
				}
			};
		}
	}
}