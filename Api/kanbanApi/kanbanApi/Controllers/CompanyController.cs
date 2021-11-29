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
    [Route("v1/company")]
    public class CompanyController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        public CompanyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("getAllCompany")]
        [Authorize]
        public async Task<IActionResult> GetAllCompanies()
        {
            IEnumerable<Company> companies = null;
            var mensage = "";
            int statusCode = 400;
            if (!User.IsInRole("manager"))
            {
                statusCode = 403;
            }
            else
            {
                companies = _unitOfWork.Companies.Find(x => x.State != "E");
                statusCode = 200;
            }
            return new ObjectResult(companies) { StatusCode = statusCode };

        }

        [HttpPost]
        [Route("registerCompany")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] Company company)
        {
            var mensage = "";
            int statusCode = 400;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                _unitOfWork.Companies.Add(company);
                _unitOfWork.Complete();
                mensage = "Se a registrado una compañia con exito ";
                statusCode = 201;
            }

            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
        [HttpPatch]
        [Route("updateCompany")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] Company company)
        {
            var mensage = "";
            int statusCode = 400;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                var companyTemp = _unitOfWork.Companies.GetById(Guid.Parse(company.Id.ToString()));
                companyTemp.Email = company.Email;
                companyTemp.Name = company.Name;
                _unitOfWork.Companies.Update(companyTemp);
                _unitOfWork.Complete();
                mensage = "Se a actualizo una compañia con exito ";
                statusCode = 200;
            }
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
        [HttpDelete]
        [Route("deleteCompany")]
        [Authorize]
        public async Task<IActionResult> Delete([FromBody] Company company)
        {
            var mensage = "";
            int statusCode = 400;
            if (!User.IsInRole("manager"))
            {
                mensage = "No tiene los permisos para ejecutar esta accion";
                statusCode = 403;
            }
            else
            {
                var companyTemp = _unitOfWork.Companies.GetById(Guid.Parse(company.Id.ToString()));
                companyTemp.State = "E";
                _unitOfWork.Companies.Update(companyTemp);
                _unitOfWork.Complete();
                mensage = "Se a elimino una compañia con exito ";
                statusCode = 200;
            }
            return new ObjectResult(mensage) { StatusCode = statusCode };
        }
    }
}
