using kanbanApi.Model;
using kanbanApi.Repositories.IRepository;
using kanbanApi.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly Kanban009Context _context;

        public UnitOfWork(Kanban009Context context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Positions = new PositionRepository(_context);
            UserTypes = new UserTypeRepository(_context);
            Companies = new CompanyRepository(_context);
        }
        public IUserRepository Users { get; private set; }

        public IPositionRepository Positions { get; private set; }

        public IUserTypeRepository UserTypes { get; private set; }

        public ICompanyRepository Companies { get; private set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
