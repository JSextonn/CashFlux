using System;
using CashFlux.Web.Errors.Models;
using CashFlux.Web.Features.Auth;

namespace CashFlux.Web.Errors.Exceptions
{
	public class FailedAuthenticationException : Exception, IErrorResponseConvertible
	{
		public FailedAuthenticationException(LoginResult result)
			: base("Authentication failed with given credentials")
		{
			Result = result;
		}
		
		public LoginResult Result { get; }
		
		public ErrorResponse ToErrorResponse()
		{
			return new ErrorResponse
			{
				Message = Message,
				ErrorDetails = new ErrorDetail[]
				{
					new FailedLoginErrorDetail
					{
						Message = "Either the username or password was not correct",
						Result = Result,
						Target = "No target provided"
					}
				}
			};
		}
	}
}