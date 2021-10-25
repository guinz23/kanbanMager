using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Project
    {
        public Project()
        {
            Tasks = new HashSet<Task>();
            UsersOnProjects = new HashSet<UsersOnProject>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal TotalAmount { get; set; }
        public Guid IdCompany { get; set; }

        public virtual Company IdCompanyNavigation { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UsersOnProject> UsersOnProjects { get; set; }
    }
}
