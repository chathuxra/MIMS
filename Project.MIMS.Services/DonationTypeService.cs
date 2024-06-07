using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Models;
using System.Threading.Tasks;
using System.Data;

namespace Project.MIMS.Services
{
    public class DonationTypeService : IDonationTypeService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public DonationTypeService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> GetAllDonationTypeLength()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetAllDonationTypeLengthModels>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllDonationTypeLength]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> GetDonationTypesForTheDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetDonationTypesForDropDownModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetDonationTypesForTheDropDown]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> GetDonationTypeID(int userID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(userID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };
                var result = await UnitOfWork.Repository<GetDonationTypeIDModel>().GetEntityBySPAsync("[Administration].[GetDonationTypeIDByUserID]", parameters);
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
