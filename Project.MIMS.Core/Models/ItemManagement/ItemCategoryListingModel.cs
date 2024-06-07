using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class ItemCategoryListingModel
    {
        public string CategoryName { get; set; }
        public string CategoryCode { get; set; }
        public bool IsActive { get; set; }
        public int ItemCategoryID { get; set; }
    }
}
