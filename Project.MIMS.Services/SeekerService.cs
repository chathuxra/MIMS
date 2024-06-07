using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Project.MIMS.Services
{
    public class SeekerService : ISeekerService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public SeekerService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetAllSeekerLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetSeekerLengthModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllSeekerLength]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> GetCurrentSeekerID(int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<SeekerIDModel>().GetEntityBySPAsync("[Administration].[GetCurrentSeekerID]", parameters);
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
