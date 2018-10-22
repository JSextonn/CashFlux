using FluentValidation;

namespace CashFlux.Web.Features.UserSource
{
	public class UserSourcePostModelValidator : AbstractValidator<UserSourcePostModel>
	{
		public UserSourcePostModelValidator()
		{
			RuleFor(model => model.UserId).NotEmpty();
			RuleFor(model => model.SourceId).NotEmpty();
		}
	}
}