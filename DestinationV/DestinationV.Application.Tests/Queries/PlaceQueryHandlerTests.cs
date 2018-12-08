using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Queries;
using DestinationV.Application.Tests.Helper;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using Place = DestinationV.Domain.Entity.PlaceEntity.Place;
using Route = DestinationV.Domain.Entity.RouteEntity.Route;

namespace DestinationV.Application.Tests.Queries
{
    [TestClass]
    public class PlaceQueryHandlerTests
    {
        private PlaceQueryHandler _queryHandler;
        private IPlaceRepository _placeRepository;
            
        [TestInitialize]
        public void Init()
        {
            _placeRepository = Substitute.For<IPlaceRepository>();
            _placeRepository.GetAll().Returns(RoutePlaceMockHelper.CreateMockPlaces());
           
            _queryHandler = new PlaceQueryHandler(_placeRepository);
        }

        [TestMethod]
        public async Task DispatchRoutesQuery_ReturnAllRoutes()
        {
            // Act
            var result = await _queryHandler.Handle(new PlacesQuery(), new CancellationToken());
            var mocksPlaces = RoutePlaceMockHelper.CreateMockPlaces();

            // Assert 
            Assert.AreEqual(result.Count, mocksPlaces.Count);
        }
    }
}
