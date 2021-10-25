using kanbanApi.Model;
using kanbanApi.Model.ViewModels;
using kanbanApi.Services;
using kanbanApi.UnitOfWorks;
using kanbanApi.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace kanbanApi.Controllers
{
    [Route("v1/login")]
    public class LoginController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public LoginController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("apiInfo")]
        [AllowAnonymous]
         public IActionResult  InfoApp()
        {
            return Ok("Api Kanban Version 1.1");
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] User user)
        {
            string message = "";
            int statusCode = 404;
            if (user.Email == null && user.Email == "" || user.Password == null || user.Password == "" || user.Name == null || user.Name == "" || user.LastName == null || user.LastName == "" || user.IdPosition == null || user.IdPosition.ToString() =="")
            {
                message = "Error al procesar el registro por favor ingresar todos los datos";
            }
            else
            {
                message = "Exito al registar el Usuario ";
                user.Password = MD5Encrypted.GetMd5Hash(user.Password);
                _unitOfWork.Users.Add(user);
                _unitOfWork.Complete();
                statusCode = 201;
            }
            return new ObjectResult(message) { StatusCode = statusCode };
        }

        [HttpPost]
        [Route("authenticate")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticateViewModel>> Login([FromBody] User user)
        {
            IEnumerable<User> users = _unitOfWork.Users.Find(x => x.Email == user.Email && x.Password == MD5Encrypted.GetMd5Hash(user.Password));
            User userTemp = users.FirstOrDefault();
            userTemp.IdPositionNavigation = _unitOfWork.Positions.GetById(userTemp.IdPosition);
            userTemp.IdUserTypeNavigation = _unitOfWork.UserTypes.GetById(userTemp.IdUserType);
            return TokenService.GenerateToken(userTemp);
            
        }

        [HttpPost]
        [Route("resetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] User user)
        {
            var message = "";
            var statusCode = 0;
            IEnumerable<User> users = _unitOfWork.Users.Find(x => x.Email == user.Email);
            if (users.Count() > 0)
            {
                User userTemp = users.FirstOrDefault();
                userTemp.Password = MD5Encrypted.GetMd5Hash(user.Password);
                _unitOfWork.Users.Update(userTemp);
                _unitOfWork.Complete();
                 message = "Se  actualizo la contraseña con exito ";
                 statusCode = 200;
            }
            else
            {
                message = "El correo ingresado no se encuentra registrado en el sistema";
                statusCode = 404;
            }
          

            return new ObjectResult(message) { StatusCode = statusCode };
        }

        [HttpGet]
        [Route("userAuthenticated")]
        [Authorize]
        public IActionResult UserAuthenticated([FromBody] User u)
        {
            var user = _unitOfWork.Users.GetById(u.Id);
            user.IdPositionNavigation = _unitOfWork.Positions.GetById(user.IdPosition);
            user.IdUserTypeNavigation = _unitOfWork.UserTypes.GetById(user.IdUserType);
            return Ok(user);
        }
       
    }
}
