namespace CommunitySolarPoc.Models
{
    public class SolarViewModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int MaxModuleCount { get; set; }
        public double MaxAnnualSunshine { get; set; }
        public double RoofSize { get; set; }
        public double TotalOutputKw { get; set; }
        public string? SelectedLocation { get; set; }
    }
}
