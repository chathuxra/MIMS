using Microsoft.Extensions.Configuration;
using Project.MIMS.Core;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.Dealer;
using Project.MIMS.Core.Services.Dealer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Project.MIMS.Services.Dealer
{
    public class DealerService : IDealerService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public DealerService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> DealerSave(DealerSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DealerID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "DealerName", Tuple.Create(model.DealerName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RegNo", Tuple.Create(model.RegNo.ToString(), DbType.String, ParameterDirection.Input) },
                    { "ContactNo", Tuple.Create(model.ContactNo.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Address", Tuple.Create(model.Address.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Email", Tuple.Create(model.Email.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<DealerSaveModel>().ExecuteSPWithInputOutputAsync("[Item].[DealerSave]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Dealer Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Dealer Saved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Dealer Save Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetDealersForDropDown()
        {
            try
            {
                var result = await UnitOfWork.Repository<DealerSaveModel>().GetEntitiesBySPAsyncWithoutParameters("[Item].[GetDealersForDropDown]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetDealerDetails(DealerSaveModel model)
        {
            var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
            {
                  { "DealerID", Tuple.Create(model.DealerID == 0 ? null : model.DealerID == 0 ? null : model.DealerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                  { "RegNo", Tuple.Create(model.RegNo == "" ? null : model.RegNo.ToString(), DbType.String, ParameterDirection.Input) },
                  { "ContactNo", Tuple.Create(model.ContactNo == "" ? null : model.ContactNo.ToString(), DbType.String, ParameterDirection.Input) },
            };

            var result = await UnitOfWork.Repository<DealerSaveModel>().GetEntitiesBySPAsync("[Item].[GetDealerDetails]", parameters);
            if (result.Count() == 0)
            {
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "No Records to Display", result);
            }
            return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), null, result);
        }

        public async Task<MIMSResponse> GetDealerDetailsByDealerID(int dealerID)
        {
            var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
            {
                  { "DealerID", Tuple.Create(dealerID.ToString(), DbType.Int32, ParameterDirection.Input) },
            };

            var result = await UnitOfWork.Repository<DealerSaveModel>().GetEntityBySPAsync("[Item].[GetDealerDetailsByDealerID]", parameters);
            return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), null, result);

        }

        public async Task<MIMSResponse> DealerUpdate(DealerSaveModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "DealerID", Tuple.Create(model.DealerID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "DealerName", Tuple.Create(model.DealerName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "RegNo", Tuple.Create(model.RegNo.ToString(), DbType.String, ParameterDirection.Input) },
                    { "ContactNo", Tuple.Create(model.ContactNo.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Address", Tuple.Create(model.Address.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Email", Tuple.Create(model.Email.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                };

                var result = await UnitOfWork.Repository<DealerSaveModel>().ExecuteSPWithInputOutputAsync("[Item].[DelaerUpdate]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Dealer Update Failed", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Dealer Update Sucessfully", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }
}
