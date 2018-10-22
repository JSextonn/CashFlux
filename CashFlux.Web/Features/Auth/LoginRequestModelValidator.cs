using FluentValidation;

namespace CashFlux.Web.Features.Auth
{
	public class LoginRequestModelValidator : AbstractValidator<LoginRequestModel>
	{
		public LoginRequestModelValidator()
		{
			RuleFor(model => model.Username).NotEmpty();
			RuleFor(model => model.Password).NotEmpty();
		}	
	}
}