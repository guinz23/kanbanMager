
using kanbanApi.Model;
using kanbanApi.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace kanbanApi.Repositories.Repository
{
    public class TaskRepository : GenericRepository<Task>,ITaskRepository
    {
        public TaskRepository(Kanban009Context context) : base (context) { }
    }
}
