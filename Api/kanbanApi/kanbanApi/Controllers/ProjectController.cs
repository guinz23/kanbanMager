using kanbanApi.Model;
using kanbanApi.UnitOfWorks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace kanbanApi.Controllers
{
    [Route("v1/project")]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProjectController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("getAllProject")]
        [Authorize]
        public async Task<IActionResult> GetAllCompanies()
        {
            var mensage = "";
            int statusCode = 400;
            IEnumerable<Project> projects = null;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                projects = _unitOfWork.Projects.Find(x => x.State != "E");
                statusCode = 200;
            }
            return new ObjectResult(projects) { StatusCode = statusCode };
        }
        [HttpPost]
        [Route("registerProject")]
        [Authorize]
        public async Task<IActionResult> RegisterProject([FromBody] Project project)
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
                if (project.Name == "" || project.Name == null || project.StartDate ==null || project.StartDate.ToString() == ""||project.DeliveryDate==null || project.DeliveryDate.ToString() == "" ||project.TotalAmount <=0 || project.IdCompany == null||project.IdCompany.ToString()==""){
                    mensage = "Por favor ingresar todos los campos requeridos";
                }
                else
                {
                    _unitOfWork.Projects.Add(project);
                    _unitOfWork.Complete();
                    mensage = "Se a creado un projecto con exito";
                    statusCode = 200;
                }
            }
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
        [HttpPatch]
        [Route("updateProject")]
        [Authorize]
        public async Task<IActionResult> UpdateProject([FromBody] Project project)
        {
            var mensage = "";
            var statusCode = 200;

            if (!User.IsInRole("Manager"))
            {
                mensage = "No posee los permisos para realizar esta acción";
                statusCode = 403;
            }
            else
            {
                var projectTemp = _unitOfWork.Projects.GetById(project.Id);
                projectTemp.Name = project.Name != "" ? project.Name : projectTemp.Name;
                projectTemp.StartDate = project.StartDate.ToString() != "" ? project.StartDate : projectTemp.StartDate;
                projectTemp.TotalAmount = project.TotalAmount != 0 ? project.TotalAmount : projectTemp.TotalAmount;
                projectTemp.DeliveryDate = project.DeliveryDate.ToString() != "" ? project.DeliveryDate : projectTemp.DeliveryDate;
                projectTemp.IdCompany = project.IdCompany.ToString() != "" ? project.IdCompany : projectTemp.IdCompany;
                _unitOfWork.Projects.Update(projectTemp);
                _unitOfWork.Complete();
                mensage = "El usuario se a actualizado con exito";

            }
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }

        [HttpDelete]
        [Route("deleteProject")]
        [Authorize]
        public  async Task<IActionResult> DeleteProject([FromBody] Project project)
        {

            var projectTemp = _unitOfWork.Projects.GetById(project.Id);
            projectTemp.State = "E";
            _unitOfWork.Projects.Update(projectTemp);
            _unitOfWork.Complete();
            var mensage = "Se elimino un projecto correctamente";
            var statusCode = 200;
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
    }
}
