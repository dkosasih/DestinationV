using System.Collections.Generic;
using System.Threading.Tasks;
using DestinationV.Application.Commands;
using DestinationV.Application.Enums;
using DestinationV.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DestinationV.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RouteController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/route
        [HttpGet]
        public async Task<IList<Route>> Get()
        {
            return await _mediator.Send(new RoutesQuery());
        }

        [HttpGet("{id}")]
        public async Task<Route> Get(string id)
        {
            return await _mediator.Send(new RouteQuery(id));
        }

        [HttpPost]
        public async Task Post([FromBody]Route route)
        {
            await _mediator.Send(new RouteCommand(route));
        }

        [HttpPut("{id}")]
        public async Task Put(string id, [FromBody]Route route)
        {
            await _mediator.Send(new RouteCommand(id, route));
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
           await _mediator.Send(new RouteCommand(id));
        }
    }
}
