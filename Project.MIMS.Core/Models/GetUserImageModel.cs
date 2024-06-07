using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Models
{
    public class GetUserImageModel
    {
        public int UserImageID { get; set; }
        public int UserID { get; set; }
        public string Image { get; set; }
    }
}
