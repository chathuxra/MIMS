using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Services;
using Project.MIMS.Core.Models;
using System.Threading.Tasks;

namespace Project.MIMS.Services
{
    public class DonorService : IDonorService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public DonorService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetAllDonorLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonorLengthModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonorLength]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
