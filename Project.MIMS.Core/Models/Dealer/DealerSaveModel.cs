using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models.Dealer
{
    public class DealerSaveModel
    {
        public string DealerName { get; set; }
        public string RegNo { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int CreatedBy { get; set; }
    }
}
