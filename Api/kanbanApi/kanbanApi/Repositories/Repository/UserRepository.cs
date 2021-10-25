using kanbanApi.Model;
using kanbanApi.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Repositories.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(Kanban009Context context) : base(context)
        {
        }
    }
}
