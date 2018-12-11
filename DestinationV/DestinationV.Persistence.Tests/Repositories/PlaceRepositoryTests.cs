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
    public class PlaceRepositoryTests
    {
        private IPlaceRepository _placeRepository;
        private SchedulingDbContext _schedulingDbContext;

        [TestInitialize]
        public void Init()
        {
            var options = new DbContextOptionsBuilder<SchedulingDbContext>()
                .UseInMemoryDatabase(databaseName: "Scheduling_Context_Mock")
                .Options;

            _schedulingDbContext = new SchedulingDbContext(options);

            _schedulingDbContext.EnsureDbSeeded();
            _placeRepository = new PlaceRepository(_schedulingDbContext);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _schedulingDbContext.Dispose();
        }

        [TestMethod]
        public async Task GetAll_AllPlaces()
        {
            // Act
            var places = await _placeRepository.GetAll();

            //Assert
            Assert.AreEqual(places.Count, 2);
        }       
    }
}
