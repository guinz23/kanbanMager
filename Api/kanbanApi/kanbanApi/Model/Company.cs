using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Company
    {
        public Company()
        {
            Projects = new HashSet<Project>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string State { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
