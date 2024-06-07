using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }
        [HttpGet]
        [Route("GetCustomerGeneralDetailsByCustomerID")]
        public async Task<MIMSResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            return await testService.GetCustomerGeneralDetailsByCustomerID(customerID);
        }
    }
}
