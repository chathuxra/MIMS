using Microsoft.Extensions.Configuration;
using Project.MIMS.Core;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Services
{
    public class TestService : ITestService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public TestService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetCustomerGeneralDetailsByCustomerID(int customerID)
        {
            try
            {
                Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CustomerID", Tuple.Create(customerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                };
                var result = (await UnitOfWork.Repository<TestModel>().GetEntitiesBySPAsync("[cms].[GetCustomerDetailsByCustomerID]", parameters));
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
    }
}
