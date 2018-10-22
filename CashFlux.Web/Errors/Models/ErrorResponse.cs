namespace CashFlux.Web.Errors.Models
{
	public class ErrorResponse
	{
		public string Message { get; set; }
		public ErrorDetail[] ErrorDetails { get; set; }
	}
}