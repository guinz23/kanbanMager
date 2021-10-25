using System;
using System.Collections.Generic;

#nullable disable

namespace kanbanApi.Model
{
    public partial class User
    {
        public User()
        {
            Tasks = new HashSet<Task>();
            UsersOnProjects = new HashSet<UsersOnProject>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Guid IdPosition { get; set; }
        public Guid IdUserType { get; set; }

        public virtual Position IdPositionNavigation { get; set; }
        public virtual UserType IdUserTypeNavigation { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UsersOnProject> UsersOnProjects { get; set; }
    }
}
