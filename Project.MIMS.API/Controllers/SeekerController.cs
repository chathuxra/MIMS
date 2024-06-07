using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeekerController : ControllerBase
    {
        private readonly ISeekerService seekerService;
        public SeekerController(ISeekerService seekerService)
        {
            this.seekerService = seekerService;
        }
        [HttpGet]
        [Route("GetAllSeekerLength")]
        public async Task<MIMSResponse> GetAllSeekerLength()
        {
            return await seekerService.GetAllSeekerLength();
        }

        [HttpGet]
        [Route("GetCurrentSeekerID")]
        public async Task<MIMSResponse> GetCurrentSeekerID(int UserID)
        {
            return await seekerService.GetCurrentSeekerID(UserID);
        }
    }
}
