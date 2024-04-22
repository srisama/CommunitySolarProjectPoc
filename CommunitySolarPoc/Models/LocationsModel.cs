namespace CommunitySolarPoc.Models
{
    public class LocationsModel
    {
    }
    public class LocationViewModel
    {
        public List<LocationData>? Locations { get; set; }
        public string? SelectedLocation { get; set; }

      //  public SolarResponse? SolarData { get; set; }


    }
    public class LocationData
    {
        public int id { get; set; }
        public string? County { get; set; }
        public string? GeoCity { get; set; }
        public string? GeoFullAdd { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

    }
}
