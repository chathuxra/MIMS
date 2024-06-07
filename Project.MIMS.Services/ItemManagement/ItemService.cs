using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core;
using Project.MIMS.Core.Services.ItemManagement;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Project.MIMS.Core.Models.ItemManagement;
using System.Linq;

namespace Project.MIMS.Services.ItemManagement
{
    public class ItemService : IItemService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public ItemService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }

        public async Task<MIMSResponse> ItemCategorySave(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(0.ToString(), DbType.Int32, ParameterDirection.InputOutput) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryName", Tuple.Create(model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemCategorySave]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Saved Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Save Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemCategoriesforListing(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "CategoryName", Tuple.Create(model.CategoryName == "" ? null : model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode == "" ? null : model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryListingModel>().GetEntitiesBySPAsync("[Item].[GetItemCategoriesforListing]", parameters);
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
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

        public async Task<MIMSResponse> ItemCategoryUpdate(ItemCategoryModel model)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(model.ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "CategoryCode", Tuple.Create(model.CategoryCode.ToString(), DbType.String, ParameterDirection.Input) },
                    { "CategoryName", Tuple.Create(model.CategoryName.ToString(), DbType.String, ParameterDirection.Input) },
                    { "IsActive", Tuple.Create(model.IsActive.ToString(), DbType.Boolean, ParameterDirection.Input) },
                    { "CreatedBy", Tuple.Create(model.CreatedBy.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[ItemCategoryUpdate]", parameters);
                if (result == -1)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Code Already Exists", result);
                }
                else if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Updated Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Item Category Update Failed", result);
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<MIMSResponse> GetItemCategoryDetailsByID(int ItemCategoryID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().GetEntityBySPAsync("[Item].[GetItemCategoryDetailsByID]", parameters);
                if (result != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Details Retrieved Sucessfully", result);
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

        public async Task<MIMSResponse> DeleteItemCategory(int ItemCategoryID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "ItemCategoryID", Tuple.Create(ItemCategoryID.ToString(), DbType.Int32, ParameterDirection.Input) },
                    { "Result", Tuple.Create("-1".ToString(), DbType.Int32, ParameterDirection.Output) }
                };

                var result = await UnitOfWork.Repository<ItemCategoryModel>().ExecuteSPWithInputOutputAsync("[Item].[DeleteItemCategory]", parameters);
                if (result > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), "Item Category Deleted Sucessfully", result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), "Error While Deleting Item Category", result);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
