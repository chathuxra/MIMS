using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models.Dealer;
using Project.MIMS.Core.Models.ItemManagement;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services.Dealer
{
    public interface IDealerService
    {
        Task<MIMSResponse> DealerSave(DealerSaveModel model);
    }
}
