using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.Dealer;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services.Dealer;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private readonly IDealerService dealerService;
        public DealerController(IDealerService dealerService)
        {
            this.dealerService = dealerService;
        }

        [HttpPost]
        [Route("DealerSave")]
        public async Task<MIMSResponse> DealerSave(DealerSaveModel model)
        {
            return await dealerService.DealerSave(model);
        }

        [HttpGet]
        [Route("GetAllDealersForDropdown")]
        public async Task<MIMSResponse> GetDealersForDropdown()
        {
            return await dealerService.GetDealersForDropDown();
        }

        [HttpPost]
        [Route("GetDealerDetails")]
        public async Task<MIMSResponse> GetDealerDetails(DealerSaveModel model)
        {
            return await dealerService.GetDealerDetails(model);
        }

        [HttpGet]
        [Route("GetDealerDetailsByDealerID")]
        public async Task<MIMSResponse> GetDealerDetailsByDealerID(int dealerID)
        {
            return await dealerService.GetDealerDetailsByDealerID(dealerID);
        }

        [HttpPost]
        [Route("DealerUpdate")]
        public async Task<MIMSResponse> DealerUpdate(DealerSaveModel model)
        {
            return await dealerService.DealerUpdate(model);
        }
    }
}
