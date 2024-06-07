using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationRequestController : ControllerBase
    {
        private readonly IDonationRequestService donationRequestService;
        public DonationRequestController(IDonationRequestService donationRequestService)
        {
            this.donationRequestService = donationRequestService;
        }

        [HttpPost]
        [Route("SaveDonationRequest")]
        public async Task<MIMSResponse> SaveDonationRequest(DonationRequestSaveModel model)
        {
            return await donationRequestService.SaveDonationRequest(model);
        }


        [HttpGet]
        [Route("DonationRequestDetailsGet")]
        public async Task<MIMSResponse> DonationRequestDetailsGet(int DonationTypeID)
        {
            return await donationRequestService.DonationRequestDetailsGet(DonationTypeID);
        }

    }
}
