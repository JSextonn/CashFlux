using System.Linq;
using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Errors.Models;

namespace CashFlux.Web.Errors.Extensions
{
	public static class UserCreationExceptionExtensions
	{
		public static ErrorResponse ToErrorResponse(this UserCreationException ex)
		{
			return new ErrorResponse
			{
				Message = ex.Message,
				ErrorDetails = ex.Errors.Select(e => new ErrorDetail
				{
					Message = e.Description,
					Target = e.Code
				}).ToArray()
			};
		}
	}
}