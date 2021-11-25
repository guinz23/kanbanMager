using kanbanApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using Task = System.Threading.Tasks.Task;

namespace kanbanApi.Services
{
   public interface IMailService
    {
     Task SendEmailAsync(Mail mailRequest);
    }
}
