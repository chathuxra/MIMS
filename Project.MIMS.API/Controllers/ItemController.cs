using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using Project.MIMS.Core.Models.ItemManagement;
using Project.MIMS.Core.Services;
using Project.MIMS.Core.Services.ItemManagement;
using Project.MIMS.Services;

namespace Project.MIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService itemService;
        public ItemController(IItemService itemService)
        {
            this.itemService = itemService;
        }

        [HttpPost]
        [Route("ItemCategorySave")]
        public async Task<MIMSResponse> ItemCategorySave(ItemCategoryModel model)
        {
            return await itemService.ItemCategorySave(model);
        }

        [HttpPost]
        [Route("GetItemCategoriesforListing")]
        public async Task<MIMSResponse> GetItemCategoriesforListing(ItemCategoryModel model)
        {
            return await itemService.GetItemCategoriesforListing(model);
        }

        [HttpPost]
        [Route("ItemCategoryUpdate")]
        public async Task<MIMSResponse> ItemCategoryUpdate(ItemCategoryModel model)
        {
            return await itemService.ItemCategoryUpdate(model);
        }

        [HttpGet]
        [Route("GetItemCategoryDetailsByID")]
        public async Task<MIMSResponse> GetItemCategoryDetailsByID(int ItemCategoryID)
        {
            return await itemService.GetItemCategoryDetailsByID(ItemCategoryID);
        }

        [HttpGet]
        [Route("DeleteItemCategory")]
        public async Task<MIMSResponse> DeleteItemCategory(int ItemCategoryID)
        {
            return await itemService.DeleteItemCategory(ItemCategoryID);
        }
    }
}
