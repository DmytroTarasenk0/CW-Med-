using CW.Models;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CW.Client
{
    public class DiagnosisClient
    {
        private readonly string _address;
        private readonly string _apikey;
        private readonly HttpClient _client;

        public DiagnosisClient(string address, string apikey)
        {
            _address = address;
            _apikey = apikey;
            _client = new HttpClient();
            _client.BaseAddress = new Uri(_address);
        }

        public async Task<string> GetDiagnosis(List<int> symptoms, string sex, int year)
        {
            var symptomsString = string.Join(",", symptoms);
            var response = await _client.GetAsync($"/diagnosis?symptoms=[{symptomsString}]&gender={sex}&year_of_birth={year}&token={_apikey}&format=json&language=en-gb");
            return await response.Content.ReadAsStringAsync();
        }
    }
}