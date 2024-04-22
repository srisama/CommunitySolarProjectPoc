namespace CommunitySolarPoc.Models
{
    using CsvHelper;
    using System.Globalization;
    using System.IO;
    using System.Collections.Generic;
    using CsvHelper.Configuration;
    using System.Formats.Asn1;

    public class ExcelService
    {
        public IEnumerable<LocationData> ReadCsv(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<LocationData>();
                return records.ToList();
            }
        }
    }
}
