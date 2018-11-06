using System;
using System.Threading.Tasks;
using DestinationV.Domain.Entity.PlaceEntity;
using DestinationV.Domain.Entity.RouteEntity;
using DestinationV.Persistence.Repositories;
using DestinationV.Persistence.Tests.Helper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DestinationV.Persistence.Tests.Repositories
{
    [TestClass]
    public class RouteRepositoryTests
    {
        private IRouteRepository _routeRepository;
        private SchedulingDbContext _schedulingDbContext;

        [TestInitialize]
        public void Init()
        {
            var options = new DbContextOptionsBuilder<SchedulingDbContext>()
                .UseInMemoryDatabase(databaseName: "Scheduling_Context_Mock")
                .Options;

            _schedulingDbContext = new SchedulingDbContext(options);

            _schedulingDbContext.EnsureDbSeeded();
            _routeRepository = new RouteRepository(_schedulingDbContext);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _schedulingDbContext.Dispose();
        }

        [TestMethod]
        public async Task GetAll_AllRoutes()
        {
            // Act
            var routes = await _routeRepository.GetAll();

            //Assert
            Assert.AreEqual(routes.Count, 2);
        }

        [TestMethod]
        public async Task GivenId_GetById_SpecificRoute()
        {
            // Arrange
            var searchId = "sthcrs-trl";

            // Act
            var route = await _routeRepository.GetById(searchId);

            //Assert
            Assert.AreEqual(route.Origin.Name, "Southern Cross");
            Assert.AreEqual(route.Destination.Name, "Traralgon");
        }

        [TestMethod]
        public async Task GivenNonExistenceId_GetById_Null()
        {
            // Arrange
            var searchId = "bla-nonexistence";

            // Act
            var route = await _routeRepository.GetById(searchId);

            //Assert
            Assert.AreEqual(route, null);
        }

        [TestMethod]
        public async Task GivenId_DeleteById_RemoveItem()
        {
            // Arrange
            var searchId = "sthcrs-trl";

            // Act
            await _routeRepository.Delete(searchId);
            var route = await _schedulingDbContext.Routes.FindAsync(searchId);

            //Assert
            Assert.AreEqual(route, null);
        }

        [TestMethod]
        public async Task GivenProduct_AddProduct_NewProductAdded()
        {
            // Arrange
            var traralgon = new Place {Id = "Station0118", Name = "Traralgon"};
            var sthCross = new Place {Id = "Station0001", Name = "Southern Cross"};

            var routeToInsert = new Route
            {
                Id = "trl-sthcrs-newId",
                OriginId = traralgon.Id,
                Origin = traralgon,
                DestinationId = sthCross.Id,
                Destination = sthCross,
                DepartUtc = (new DateTime(2018, 09, 01))
            };

            // Act
            await _routeRepository.Add(routeToInsert);
            var route = await _schedulingDbContext.Routes.FindAsync(routeToInsert.Id);

            //Assert
            Assert.AreEqual(route.Id, routeToInsert.Id);
            Assert.AreEqual(route.Origin.Name, routeToInsert.Origin.Name);
            Assert.AreEqual(route.Destination.Name, routeToInsert.Destination.Name);
        }

        [TestMethod]
        [ExpectedException(typeof(InvalidOperationException), "Route exists")]
        public async Task GivenProductWithSameId_AddProduct_ExceptionThrown()
        {
            // Arrange
            var traralgon = new Place {Id = "Station0118", Name = "Traralgon"};
            var sthCross = new Place {Id = "Station0001", Name = "Southern Cross"};

            var routeToInsert = new Route
            {
                Id = "trl-sthcrs",
                OriginId = traralgon.Id,
                Origin = traralgon,
                DestinationId = sthCross.Id,
                Destination = sthCross,
                DepartUtc = (new DateTime(2018, 09, 01))
            };

            // Act
            await _routeRepository.Add(routeToInsert);
        }

        [TestMethod]
        public async Task GivenProductAndId_UpdateProduct_ProductUpdated()
        {
            // Arrange
            var somewhere = new Place {Id = "Station20000", Name = "SomewhereElse"};
            var somewhereElse = new Place {Id = "Station30000", Name = "SomewhereElse001"};

            var routeToUpdate = new Route
            {
                Id = "trl-sthcrs",
                OriginId = somewhere.Id,
                Origin = somewhere,
                DestinationId = somewhereElse.Id,
                Destination = somewhereElse,
                DepartUtc = (new DateTime(2018, 09, 01))
            };


            // Act
            await _routeRepository.Update(routeToUpdate.Id, routeToUpdate);
            var route = await _schedulingDbContext.Routes.FindAsync(routeToUpdate.Id);

            //Assert
            Assert.AreEqual(route.Id, routeToUpdate.Id);
            Assert.AreEqual(route.OriginId, routeToUpdate.OriginId);
            Assert.AreEqual(route.DestinationId, routeToUpdate.DestinationId);
        }
    }
}
