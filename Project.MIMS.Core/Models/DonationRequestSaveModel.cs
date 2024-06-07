using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class DonationRequestSaveModel
    {
        public int SeekerID { get; set; }
        public int DonationTypeID { get; set; }
        public string Description { get; set; }
        public string RequiredBefore { get; set; }
        public string Amount { get; set; }
        public int BloodType { get; set; }

    }
}
