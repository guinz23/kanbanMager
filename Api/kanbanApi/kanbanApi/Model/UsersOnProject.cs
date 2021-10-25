using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class UsersOnProject
    {
        public Guid Id { get; set; }
        public Guid IdUser { get; set; }
        public Guid IdProject { get; set; }

        public virtual Project IdProjectNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
