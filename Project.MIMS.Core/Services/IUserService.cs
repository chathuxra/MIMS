using Project.MIMS.Core.Common;
using Project.MIMS.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.MIMS.Core.Services
{
    public interface IUserService
    {
        Task<MIMSResponse> GetAllUsers();
        Task<MIMSResponse> Login(UserLoginModel model);
        Task<MIMSResponse> Registration(UserRegistrationInsertModel model);
        Task<MIMSResponse> GetUserDetailsByUserID(int UserID);
        Task<MIMSResponse> GetUserImageByUserID(int UserID);
        Task<MIMSResponse> GetLastQRCodeNumber();
    }
}
