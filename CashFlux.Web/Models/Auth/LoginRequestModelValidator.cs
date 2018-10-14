using FluentValidation;

namespace CashFlux.Web.Models.Auth
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