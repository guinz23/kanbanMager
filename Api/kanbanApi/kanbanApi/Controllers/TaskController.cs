using kanbanApi.Model;
using kanbanApi.Model.ViewModels;
using kanbanApi.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace kanbanApi.Controllers
{
    [Route("v1/task")]
    public class TaskController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public TaskController(IUnitOfWork unitOfWork) {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("getAllTask")]
        [Authorize]
        public async System.Threading.Tasks.Task<IActionResult> GetAllTask()
        {
            var mensage = "";
            int statusCode = 400;
            IEnumerable<Model.Task> tasks = null;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                tasks = _unitOfWork.Tasks.Find(x=>x.State!="E");
                statusCode = 200;
            }
            return new ObjectResult(tasks) { StatusCode = statusCode };
        }
        [HttpPost]
        [Route("registerTask")]
        [Authorize]
        public async Task<IActionResult> RegisterProject([FromBody] Model.Task task)
        {
            var mensage = "";
            var statusCode = 200;
            if (!User.IsInRole("manager"))
            {
                mensage = "No cuenta con los permisos necesarios para esta acción";
                statusCode = 403;
            }
            else
            {
                _unitOfWork.Tasks.Add(task);
                _unitOfWork.Complete();
                mensage = "Se a creado una tarea con exito ";
                statusCode = 200;
            }
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
        [HttpDelete]
        [Route("deleteTask")]
        [Authorize]
        public async Task<IActionResult> DeleteTask([FromBody] Model.Task task)
        {

            var taskTemp = _unitOfWork.Tasks.GetById(task.Id);
            taskTemp.State = task.State;
            _unitOfWork.Tasks.Update(taskTemp);
            _unitOfWork.Complete();
            var mensage = "Se elimino una tarea correctamente";
            var statusCode = 200;
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }

        [HttpGet]
        [Route("taskByProject")]
        [Authorize]
        public async Task<IActionResult> taskByProject()
        {
            var mensage = "";
            int statusCode = 400;
            List<TaskByProjectsViewModel> taskByProjects = new List<TaskByProjectsViewModel>();

            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                var result = _unitOfWork.Tasks.Find(x=>x.State!="E");

                foreach (var user in result)
                {
                    var taskTemp = _unitOfWork.Tasks.GetById(user.Id);
                    TaskByProjectsViewModel projectsViewModel = new TaskByProjectsViewModel();
                    projectsViewModel.NameTask = taskTemp.Name;
                    projectsViewModel.NameProject = _unitOfWork.Projects.GetById(taskTemp.IdProject).Name;
                    projectsViewModel.StateProject = taskTemp.State;
                    taskByProjects.Add(projectsViewModel);
                }
                statusCode = 200;
            }
            return new ObjectResult(taskByProjects) { StatusCode = statusCode };
        }
        [HttpPost]
        [Route("taskByUser")]
        [Authorize]
        public async Task<IActionResult> taskByUser([FromBody] User user)
        {
            var mensage = "";
            int statusCode = 400;
            IEnumerable<Model.Task> tasks = null;
            if (User.IsInRole("manager") || User.IsInRole("employee"))
            {
                tasks = _unitOfWork.Tasks.Find(x => x.IdUserAssigned == user.Id);
                statusCode = 200;
            }
            return new ObjectResult(tasks) { StatusCode = statusCode };
        }
    }
}
