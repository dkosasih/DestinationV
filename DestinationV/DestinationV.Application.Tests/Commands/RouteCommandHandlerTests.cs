using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DestinationV.Application.Commands;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;

namespace DestinationV.Application.Tests.Commands
{
    [TestClass]
    public class RouteCommandHandlerTests
    {
        private RouteCommandHandler _commandHandler;
        private IRouteRepository _routeRepository;

        [TestInitialize]
        public void Init()
        {
            _routeRepository = Substitute.For<IRouteRepository>();

            _commandHandler = new RouteCommandHandler(_routeRepository);
        }

        [TestMethod]
        public async Task DispatchCommandWithIdParameter_RepositoryDeleteMethodCalledWithTransformedValue()
        {
            // Act
            var result = await _commandHandler.Handle(new RouteCommand("1"), new CancellationToken());

            // Assert 
            await _routeRepository.Received().Delete("1");
        }

        [TestMethod]
        public async Task DispatchCommandWithRouteParameter_RepositoryAddMethodCalledWithTransformedValue()
        {
            // Arrange
            var RouteDto = new Application.Queries.Route
            {
                Id = "MockId",
                Origin = new Application.Queries.Place
                {
                    Id = "abc",
                    Name = "Traralgon"
                },
                Destination = new Application.Queries.Place
                {
                    Id = "efg",
                    Name = "Somewhere"
                },
                DepartUtc = new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime()
            };

            // Act
            var result = await _commandHandler.Handle(new RouteCommand(RouteDto), new CancellationToken());

            // Assert 
            // await _routeRepository.Received().Add(transformedEntityObjectToSave);
            await _routeRepository.Received().Add(Arg.Is<Route>(m =>
                m.DestinationId == "efg" &&
                m.OriginId == "abc" &&
                m.DepartUtc == new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime()
            ));
        }

        [TestMethod]
        public async Task DispatchCommandWithRouteAndIdParameter_RepositoryUpdateMethodCalledWithTransformedValue()
        {
            // Arrange
            var RouteDto = new Application.Queries.Route
            {
                Id = "MockId",
                Origin = new Application.Queries.Place
                {
                    Id = "abc",
                    Name = "Traralgon"
                },
                Destination = new Application.Queries.Place
                {
                    Id = "efg",
                    Name = "Somewhere"
                },
                DepartUtc = new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime()
            };

            // Act
            var result = await _commandHandler.Handle(new RouteCommand("Id", RouteDto), new CancellationToken());

            // Assert 
            // await _routeRepository.Received().Add(transformedEntityObjectToSave);
            await _routeRepository.Received().Update("Id", Arg.Is<Route>(m =>
                m.DestinationId == "efg" &&
                m.OriginId == "abc" &&
                m.DepartUtc == new DateTime(2018, 12, 1, 14, 15, 00).ToUniversalTime()
            ));
        }
    }
}
