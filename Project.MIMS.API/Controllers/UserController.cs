using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Services;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<MIMSResponse> GetAllUsers()
        {
            return await userService.GetAllUsers();
        }
        [HttpPost]
        [Route("Registration")]
        public async Task<MIMSResponse> Registration(UserRegistrationInsertModel model)
        {
            return await userService.Registration(model);
        }
        [HttpPost]
        [Route("Login")]
        public async Task<MIMSResponse> Login(UserLoginModel model)
        {
            return await userService.Login(model);
        }

        [HttpGet]
        [Route("GetUserDetailsByUserID")]
        public async Task<MIMSResponse> GetUserDetailsByUserID(int UserID)
        {
            return await userService.GetUserDetailsByUserID(UserID);
        }

        [HttpGet]
        [Route("GetUserImageByUserID")]
        public async Task<MIMSResponse> GetUserImageByUserID(int UserID)
        {
            return await userService.GetUserImageByUserID(UserID);
        }
    }
}
