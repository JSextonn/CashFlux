using System;

namespace CashFlux.Web.Exceptions
{
	public class FailedLoginException : Exception
	{
		public FailedLoginException(string message) : base(message) { }
	}
}