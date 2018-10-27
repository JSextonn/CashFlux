using CashFlux.Web.Errors.Models;

namespace CashFlux.Web.Errors
{
	public interface IErrorResponseConvertible
	{
		ErrorResponse ToErrorResponse();
	}
}