using CW.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CW.Client
{
    public class IssueInfoClient
    {
        private readonly string _address;
        private readonly string _apikey;
        private readonly HttpClient _client;

        public IssueInfoClient(string address, string apikey)
        {
            _address = address;
            _apikey = apikey;
            _client = new HttpClient();
            _client.BaseAddress = new Uri(_address);
        }

        public async Task<string> GetIssueInfo(int id)
        {
            var response = await _client.GetAsync($"/issues/{id}/info?token={_apikey}&format=json&language=en-gb");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
