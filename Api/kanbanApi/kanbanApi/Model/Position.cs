using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class Position
    {
        public Position()
        {
            Users = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string NamePosition { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
