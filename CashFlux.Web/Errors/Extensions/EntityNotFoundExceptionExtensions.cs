using CashFlux.Web.Errors.Exceptions;
using CashFlux.Web.Errors.Models;

namespace CashFlux.Web.Errors.Extensions
{
	public static class EntityNotFoundExceptionExtensions
	{
		public static ErrorResponse ToErrorResponse(this EntityNotFoundException ex)
		{
			return new ErrorResponse
			{
				Message = ex.Message
			};
		}
	}
}