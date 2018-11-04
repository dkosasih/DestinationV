using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DestinationV.Domain.SeedWork
{
    public interface IRepository<T> 
    {
        Task<T> GetById(string id);
    }
}
