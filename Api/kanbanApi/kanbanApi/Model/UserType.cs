using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class UserType
    {
        public UserType()
        {
            Users = new HashSet<User>();
        }

        public Guid Id { get; set; }
        public string Type { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
