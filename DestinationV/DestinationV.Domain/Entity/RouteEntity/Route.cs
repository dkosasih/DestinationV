using System;
using DestinationV.Domain.Entity.PlaceEntity;

namespace DestinationV.Domain.Entity.RouteEntity
{
    public class Route : SeedWork.Entity
    {
        public string OriginId { get; set; }
        public virtual Place Origin { get; set; }
        public string DestinationId { get; set; }
        public virtual Place Destination { get; set; }

        public DateTime DepartUtc { get; set; }
    }
}
