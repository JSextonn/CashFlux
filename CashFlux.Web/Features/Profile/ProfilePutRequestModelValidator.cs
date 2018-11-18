using CashFlux.Data;
using CashFlux.Web.Features.Shared;
using FluentValidation;

namespace CashFlux.Web.Features.Profile
{
	public class ProfilePutRequestModelValidator : CashFluxAbstractValidator<ProfilePutRequestModel>
	{
		public ProfilePutRequestModelValidator(CashFluxDbContext context) : base(context)
		{
			RuleFor(model => model.Name).MaximumLength(20);
		}
	}
}