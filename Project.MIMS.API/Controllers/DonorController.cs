using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorController : ControllerBase
    {
        private readonly IDonorService donorService;
        public DonorController(IDonorService donorService)
        {
            this.donorService = donorService;
        }

        [HttpGet]
        [Route("GetAllDonorLength")]
        public async Task<MIMSResponse> GetAllDonorLength()
        {
            return await donorService.GetAllDonorLength();
        }
    }
}
