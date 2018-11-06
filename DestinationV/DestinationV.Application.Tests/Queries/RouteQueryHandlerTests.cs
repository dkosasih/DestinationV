using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Queries;
using DestinationV.Application.Tests.Helper;
using DestinationV.Domain.Entity.RouteEntity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using Place = DestinationV.Domain.Entity.PlaceEntity.Place;
using Route = DestinationV.Domain.Entity.RouteEntity.Route;

namespace DestinationV.Application.Tests.Queries
{
    [TestClass]
    public class RouteQueryHandlerTests
    {
        private RouteQueryHandler _queryHandler;
        private IRouteRepository _routeRepository;
            
        [TestInitialize]
        public void Init()
        {
            _routeRepository = Substitute.For<IRouteRepository>();
            _routeRepository.GetAll().Returns(RouteHelper.CreateMockRoutes());
            _routeRepository.GetById(Arg.Any<string>())
                .Returns(new Route()
                {
                    Id = "MockId",
                    DestinationId = "abc",
                    Destination = new Place
                    {
                        Id = "abc",
                        Name = "Traralgon"
                    },
                    OriginId = "efg",
                    Origin = new Place
                    {
                        Id = "efg",
                        Name = "Southern Cross"
                    },
                    DepartUtc = new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime()
                });

            _queryHandler = new RouteQueryHandler(_routeRepository);
        }

        [TestMethod]
        public async Task DispatchRoutesQuery_ReturnAllRoutes()
        {
            // Act
            var result = await _queryHandler.Handle(new RoutesQuery(), new CancellationToken());

            // Assert 
            Assert.AreEqual(result.Count, 2);
        }

        [TestMethod]
        public async Task DispatchRouteQueryWithId_ReturnRoute()
        {
            // Arrange
            var routeId = "MockId";
            // Act
            var result = await _queryHandler.Handle(new RouteQuery(routeId), new CancellationToken());

            // Assert 
            Assert.AreEqual(result.Origin.Id, "efg");
            Assert.AreEqual(result.Destination.Id, "abc");
            Assert.AreEqual(result.DepartUtc, new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime());
        }

        
    }
}
