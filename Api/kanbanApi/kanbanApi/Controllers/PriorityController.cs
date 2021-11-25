using kanbanApi.Model;
using kanbanApi.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Controllers
{
    [Route("v1/priority")]
    public class PriorityController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public PriorityController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        [Route("getAllPriorities")]
        [Authorize]

        public async Task<IActionResult> GetPriority()
        {
            var mensage = "";
            int statusCode = 400;
            IEnumerable<Priority> priorities = null;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                priorities = _unitOfWork.Prioritys.GetAll();
                statusCode = 200;
            }
            return new ObjectResult(priorities) { StatusCode = statusCode };
        }
    }
}
