using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Priority
    {
        public Priority()
        {
            Tasks = new HashSet<Task>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
