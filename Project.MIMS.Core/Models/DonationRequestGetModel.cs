using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class DonationRequestGetModel
    {
        public int DonationRequestID { get; set; }
        public string DonationTypeName { get; set; }
        public string Name { get; set; }
        public string ContactNumber { get; set; }
        public string BloodTypeName { get; set; }
        public decimal Amount { get; set; }
        public DateTime RequestBefore { get; set; }
    }
}
