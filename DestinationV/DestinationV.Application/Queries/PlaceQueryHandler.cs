using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Interfaces;
using DestinationV.Domain.Entity.PlaceEntity;

namespace DestinationV.Application.Queries
{
    public class PlaceQueryHandler: IQueryHandler<PlacesQuery, IList<Place>>
    {
        private readonly IPlaceRepository _placeRepository;

        public PlaceQueryHandler(IPlaceRepository placeRepository)
        {
            _placeRepository = placeRepository;
        }

        public async Task<IList<Place>> Handle(PlacesQuery request, CancellationToken cancellationToken)
        {
            return MapPlacesToViewModel(await _placeRepository.GetAll());
        }

        private Place MapPlaceToViewModel(Domain.Entity.PlaceEntity.Place place)
        {
            return new Place
            {
                Id = place.Id,
                Name = place.Name
            };
        }

        private IList<Place> MapPlacesToViewModel(IList<Domain.Entity.PlaceEntity.Place> places)
        {
            return places.Select(MapPlaceToViewModel).ToList();
        }
    }
}
 