using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DestinationV.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DestinationV.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PlaceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/place
        [HttpGet]
        public async Task<IList<Place>> Get()
        {
            return await _mediator.Send(new PlacesQuery());
        }
    }
}