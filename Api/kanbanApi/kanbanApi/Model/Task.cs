using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Task
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string State { get; set; }
        public decimal Amount { get; set; }
        public Guid IdUserAssigned { get; set; }
        public Guid IdPriority { get; set; }
        public Guid IdProject { get; set; }

        public virtual Priority IdPriorityNavigation { get; set; }
        public virtual Project IdProjectNavigation { get; set; }
        public virtual User IdUserAssignedNavigation { get; set; }
    }
}
