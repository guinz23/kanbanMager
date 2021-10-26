using kanbanApi.Model;
using kanbanApi.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Repositories.Repository
{
    public class ProjectRepository:GenericRepository<Project>,IProjectRepository
    {
        public ProjectRepository (Kanban009Context context) : base(context) 
        {
       
        }
    }
}
