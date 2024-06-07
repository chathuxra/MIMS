using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface IMobileService
    {
        Task<MIMSResponse> UpdateVerifyStatus(UpdateVerifyDetailsInputModel model);
        Task<MIMSResponse> GetUserDetailsForProfile(UpdateVerifyDetailsInputModel model);
    }
}
