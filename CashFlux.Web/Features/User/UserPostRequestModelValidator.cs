using FluentValidation;

namespace CashFlux.Web.Features.User
{
	public class UserPostRequestModelValidator : AbstractValidator<UserPostRequestModel>
	{
		public UserPostRequestModelValidator()
		{
			RuleFor(user => user.Email).NotEmpty().EmailAddress();
			RuleFor(user => user.Password).NotEmpty().MinimumLength(8);
			RuleFor(user => user.ConfirmPassword).NotEmpty().Equal(user => user.Password);
			RuleFor(user => user.FirstName).MaximumLength(25);
			RuleFor(user => user.LastName).MaximumLength(25);
		}
	}
}