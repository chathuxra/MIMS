using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class UserGetModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int UserType { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
    }
}
