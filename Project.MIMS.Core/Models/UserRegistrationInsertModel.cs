using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class UserRegistrationInsertModel
    {
        public string Nic { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }
        public string Dob { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public int DonationTypeID { get; set; }
        public int UserTypeID { get; set; }
        public string ConfirmPassword { get; set; }
        public string ContactNumber { get; set; }
    }
}