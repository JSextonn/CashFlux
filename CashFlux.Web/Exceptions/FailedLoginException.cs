using System;

namespace CashFlux.Web.Exceptions
{
	/// <inheritdoc />
	/// <summary>
	/// This exception is thrown when a login attempt is failed.
	/// </summary>
	public class FailedLoginException : Exception
	{
		public FailedLoginException()
			: base("Authentication attempt failed") { }

		public FailedLoginException(string username, string password)
			: base($"Failed to authenticate as {username} with password: '{password}'") { }
	}
}