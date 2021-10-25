using kanbanApi.Model;
using kanbanApi.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Repositories.Repository
{
    public class UserTypeRepository : GenericRepository<UserType>, IUserTypeRepository
    {
        public UserTypeRepository(Kanban009Context context) : base(context)
        {
        }
}
}
