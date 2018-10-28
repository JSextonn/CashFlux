using FluentValidation;

namespace CashFlux.Web.Features.Source
{
	public class SourcePostRequestModelValidator : AbstractValidator<SourcePostRequestModel>
	{
		public SourcePostRequestModelValidator()
		{
			RuleFor(request => request.Name).NotEmpty().MaximumLength(25);
			RuleFor(request => request.Category).NotEmpty().MaximumLength(25);
		}
	}
}