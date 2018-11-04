using System;

namespace DestinationV.Application.Queries
{
    public class Place
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class Route
    {
        public string Id { get; set; }
        public Place Origin { get; set; }
        public Place Destination { get; set; }
        public DateTime DepartUtc { get; set; }
    }
}
