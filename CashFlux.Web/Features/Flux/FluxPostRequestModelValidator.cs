using System;
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
			RuleFor(model => model.TimeOccurred).NotEmpty()
				.Must(BeValidDate)
				.WithMessage("TimeOccurred is not a correctly formatted date ex. 2012-04-23T18:25:43.511Z");
		}

		private static bool BeValidDate(DateTime date) => !date.Equals(default(DateTime));
	}
}