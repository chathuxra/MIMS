using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.ItemManagement
{
    public class ItemCategoryModel
    {
        public int ItemCategoryID { get; set; }
        public string CategoryName { get; set; }
        public string CategoryCode { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
