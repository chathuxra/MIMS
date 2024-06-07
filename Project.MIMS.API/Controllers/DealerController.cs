using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.Dealer;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services.Dealer;

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
    }
}
