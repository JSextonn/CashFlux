using FluentValidation;

namespace CashFlux.Web.Features.Flux
{
	public class FluxPostRequestModelValidator : AbstractValidator<FluxPostRequestModel>
	{
		public FluxPostRequestModelValidator()
		{
			RuleFor(model => model.Amount).NotEmpty();
			RuleFor(model => model.ProfileId).NotEmpty();
			RuleFor(model => model.SourceId).NotEmpty();
		}
	}
}