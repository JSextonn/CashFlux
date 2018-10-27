namespace CashFlux.Web.Errors.Models
{
	public class ErrorResponse
	{
		public string Message { get; set; }
		public ErrorDetail[] ErrorDetails { get; set; }

		public static ErrorResponse DefaultErrorResponse()
		{
			return new ErrorResponse
			{
				Message = "A bad request was received.",
				ErrorDetails = new[]
				{
					new ErrorDetail
					{
						Message = "The body of the request contained no usable content."
					}
				}
			};
		}
	}
}