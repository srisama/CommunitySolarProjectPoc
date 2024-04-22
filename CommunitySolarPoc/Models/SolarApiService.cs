using Newtonsoft.Json;

namespace CommunitySolarPoc.Models
{
    public class SolarApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "YOUR_API_KEY_HERE";

        public SolarApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        //public async Task<SolarData> GetSolarDataAsync(double latitude, double longitude)
        //{
        //    var url = $"https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude={latitude}&location.longitude={longitude}&requiredQuality=HIGH&key={_apiKey}";
        //    var response = await _httpClient.GetAsync(url);

        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync();
        //        return JsonConvert.DeserializeObject<SolarData>(content);
        //    }

        //    throw new Exception("Failed to fetch data from Google Solar API.");
        //}
    }
}
