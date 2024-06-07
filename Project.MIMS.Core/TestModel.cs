using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core
{
    public class TestModel
    {
        public int CustomerID { get; set; }
        public int GroupID { get; set; }
        public int FactoryID { get; set; }
        public int RouteID { get; set; }
        public string CustomerCode { get; set; }
        public DateTime Dob { get; set; }
        public string FirstName { get; set; }
        public string Gender { get; set; }
        public string Home { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Mobile { get; set; }
        public string Nic { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public string Addresstwo { get; set; }
        public string Addressthree { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? JoiningDate { get; set; }
        public int? AreaType { get; set; }
        public float? Area { get; set; }
    }
}
