using Project.MIMS.Core.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface ISeekerService
    {
        Task<MIMSResponse> GetAllSeekerLength();
        Task<MIMSResponse> GetCurrentSeekerID(int UserID);
    }
}
