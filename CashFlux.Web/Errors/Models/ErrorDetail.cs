namespace CashFlux.Web.Errors.Models
{
	public class ErrorDetail
	{
		public string Message { get; set; } = "No message was provided";
		public string Target { get; set; } = "No target was provided";
	}
}