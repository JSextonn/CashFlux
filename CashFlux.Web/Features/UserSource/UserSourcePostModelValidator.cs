using FluentValidation;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourcePostModelValidator : AbstractValidator<UserSourcePostRequestModel>
	{
		public UserSourcePostModelValidator()
		{
			RuleFor(model => model.UserId).NotEmpty();
			RuleFor(model => model.SourceId).NotEmpty();
		}
	}
}