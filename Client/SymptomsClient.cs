using CW.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace CW.Client
{
    public class SymptomClient
    {
        private readonly string _address;
        private readonly string _apikey;
        private readonly HttpClient _client;

        public SymptomClient(string address, string apikey)
        {
            _address = address;
            _apikey = apikey;
            _client = new HttpClient();
            _client.BaseAddress = new Uri(_address);
        }

        public async Task<List<Symptom>> GetSymptoms()
        {
            var response = await _client.GetAsync($"/symptoms?token={_apikey}&format=json&language=en-gb");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<Symptom>>(content);
        }
    }
}
