using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileController : ControllerBase
    {
        private readonly IMobileService mobileService;
        public MobileController(IMobileService mobileService)
        {
            this.mobileService = mobileService;
        }
        [HttpPost]
        [Route("UpdateVerifyStatus")]
        public async Task<MIMSResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            return await mobileService.UpdateVerifyStatus(model);
        }

        [HttpPost]
        [Route("GetUserDetailsForProfile")]
        public async Task<MIMSResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model)
        {
            return await mobileService.GetUserDetailsForProfile(model);
        }
    }
}
