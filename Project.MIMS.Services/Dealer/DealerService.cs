using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services.Dealer;
using Project.MIMS.Core.Services.ItemManagement;
using System;
using System.Collections.Generic;
using System.Text;
using Project.MIMS.Core.Models.ItemManagement;
using System.Data;
using System.Threading.Tasks;
using Project.MIMS.Core.Models.Dealer;

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

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[DealerSave]", parameters);
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
    }
}
