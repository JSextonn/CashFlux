using System;
using System.Net.Http;
using System.Threading.Tasks;
using CashFlux.Data;
using CashFlux.Web.Features.User;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Xunit;

namespace CashFlux.Test.Features
{
	public abstract class CashFluxWebServerTestBase<TGetModel, TPostModel, TDeleteResult> : 
		IClassFixture<CashFluxWebApplicationFactory>, 
		IAsyncLifetime,
		IDisposable
	{
		// Leave public that way inheriting classes don't implement the base as protected by default.
		// Test classes will not run with protected constructors.
		public CashFluxWebServerTestBase(CashFluxWebApplicationFactory applicationFactory, 
			string endpointName)
		{
			Client = applicationFactory.CreateClient();
			EndpointName = endpointName;
		}

		protected HttpClient Client { get; }
		protected string EndpointName { get; }

		public abstract Task InitializeAsync();
		public abstract Task DisposeAsync();
		
		/// <summary>
		/// Used to send a http request to the application layer.
		/// Ensures the status code is successful.
		/// Only use this method when expecting successful status codes.
		/// </summary>
		/// <param name="request">The request that will be sent</param>
		/// <typeparam name="T">The type that will be returned in the response body</typeparam>
		/// <returns>The content in the response body</returns>
		protected static async Task<T> SendRequestAsync<T>(Task<HttpResponseMessage> request)
		{
			var response = await request;
			response.EnsureSuccessStatusCode();
			return JsonConvert.DeserializeObject<T>(await response.Content.ReadAsStringAsync());
		}
		
		/// <summary>
		/// Creates an entity in the test database using the test client
		/// </summary>
		/// <param name="postModel">The post model that should be sent to the API</param>
		/// <returns>The get model of the created entity</returns>
		protected async Task<TGetModel> CreateEntityAsync(TPostModel postModel)
			=> await SendRequestAsync<TGetModel>(
				Client.PostAsJsonAsync($"{EndpointName}", postModel));

		/// <summary>
		/// Retrieves an entity from the test data base, based on a given id
		/// </summary>
		/// <param name="id">The id of the entity that should be retrieved</param>
		/// <returns>The get model of the retrieved entity</returns>
		protected async Task<TGetModel> GetEntityAsync(string id)
			=> await SendRequestAsync<TGetModel>(
				Client.GetAsync($"{EndpointName}/{id}"));

		/// <summary>
		/// Deletes an entity from the test data base, based on a given id
		/// </summary>
		/// <param name="id">The id of the entity that should be deleted</param>
		/// <returns>The entity delete result</returns>
		protected async Task<TDeleteResult> DeleteEntityAsync(string id)
			=> await SendRequestAsync<TDeleteResult>(
				Client.DeleteAsync($"{EndpointName}/{id}"));

		public void Dispose()
		{
			Client?.Dispose();
		}
	}
}