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
using System.Linq;
using System.Reflection;

namespace Project.MIMS.Services
{
    public class DonationRequestService : IDonationRequestService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public DonationRequestService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> SaveDonationRequest(DonationRequestSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DonationRequestID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "SeekerID", Tuple.Create(model.SeekerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DonationTypeID", Tuple.Create(model.DonationTypeID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Description", Tuple.Create(model.Description.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RequiredBefore", Tuple.Create(model.RequiredBefore.ToString(), DbType.DateTime, ParameterDirection.Input) },
                    { "Amount", Tuple.Create(model.Amount == "" ? null : model.Amount.ToString(), DbType.Decimal, ParameterDirection.Input) },
                    { "BloodType", Tuple.Create(model.BloodType == 0 ? null :model.BloodType.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DonationRequestStatus", Tuple.Create(1.ToString(), DbType.Int32, ParameterDirection.Input) },
                };

                var result = await UnitOfWork.Repository<DonationRequestSaveModel>().ExecuteSPWithInputOutputAsync("[Administration].[SaveDonationRequestDetails]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Donation Request Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Donation Request Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> DonationRequestDetailsGet(int DonationTypeID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DonationTypeID", Tuple.Create(DonationTypeID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<DonationRequestGetModel>().GetEntitiesBySPAsync("[Administration].[GetAllDonationRequestsByDonationType]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Donation Request Details Retrieved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
