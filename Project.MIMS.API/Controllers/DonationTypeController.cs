using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationTypeController : ControllerBase
    {
        public readonly IDonationTypeService donationTypeService;
        public DonationTypeController(IDonationTypeService donationTypeService)
        {
            this.donationTypeService = donationTypeService;
        }
        [HttpGet]
        [Route("GetAllDonationTypeLength")]
        public async Task<MIMSResponse> GetAllDonationTypeLength()
        {
            return await donationTypeService.GetAllDonationTypeLength();
        }

        [HttpGet]
        [Route("GetDonationTypesForTheDropDown")]
        public async Task<MIMSResponse> GetDonationTypesForTheDropDown()
        {
            return await donationTypeService.GetDonationTypesForTheDropDown();
        }

        [HttpGet]
        [Route("GetDonationTypeID")]
        public async Task<MIMSResponse> GetDonationTypeID(int userID)
        {
            return await donationTypeService.GetDonationTypeID(userID);
        }
    }
}
