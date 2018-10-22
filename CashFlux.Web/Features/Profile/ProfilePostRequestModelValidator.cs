using FluentValidation;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePostRequestModelValidator : AbstractValidator<ProfilePostRequestModel>
	{
		public ProfilePostRequestModelValidator()
		{
			RuleFor(request => request.Name).NotEmpty().MaximumLength(30);
			RuleFor(request => request.UserFk).NotEmpty();
		}
	}
}