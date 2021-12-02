using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Model.ViewModels
{
    public class TaskByProjectsViewModel
    {

        public string NameTask { get; set; }
        public string NameProject { get; set; }
        public string StateProject { get; set; }
    }
}
