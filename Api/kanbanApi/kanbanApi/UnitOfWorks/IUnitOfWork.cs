using kanbanApi.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.UnitOfWorks
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        IPositionRepository Positions  { get; }
        IUserTypeRepository UserTypes { get; }
        ICompanyRepository Companies { get; }
        IProjectRepository Projects { get; }
       int Complete();
    }
}
