using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class GetUserDetailsForProfileModel
    {
        public string Name { get; set; }
        public string UserType { get; set; }
        public string Email { get; set; }
        public DateTime JoinedDate { get; set; }
        public DateTime DOB { get; set; }
        public string Address { get; set; }
        public int UserID { get; set; }
        public int VerifyStatus { get; set; }
        public string QRTagNumber { get; set; }
    }
}
