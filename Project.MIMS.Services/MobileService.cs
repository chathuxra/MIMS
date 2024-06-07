using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Models;
using System.Data;
using System.Threading.Tasks;

namespace Project.MIMS.Services
{
    public class MobileService : IMobileService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public MobileService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "VerifyStatus", Tuple.Create(2.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<UpdateVerifyDetailsInputModel>().ExecuteSPWithInputOutputAsync("[Administration].[UpdateVerifyStatus]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "User Verified Successfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "User Verification Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(model.UserID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "UserType", Tuple.Create(model.UserType.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<GetUserDetailsForProfileModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsForProfile]", parameters);
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "User Retrieved Successfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to display", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
