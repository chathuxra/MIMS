using Project.MIMS.Core.Common;
using Project.MIMS.Core;
using Project.MIMS.Core.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Project.MIMS.Core.Models;
using System.Linq;
using Project.MIMS.Dapper;
using System.IO;

namespace Project.MIMS.Services
{
    public class UserService : IUserService
    {
        private readonly IMIMSUnitOfWork UnitOfWork;
        private readonly IMIMSResponse MIMSResponse;
        private readonly IConfiguration configuration;

        public UserService(IMIMSUnitOfWork UnitOfWork, IMIMSResponse MIMSResponse, IConfiguration configuration)
        {
            this.MIMSResponse = MIMSResponse;
            this.UnitOfWork = UnitOfWork;
            this.configuration = configuration;
        }
        public async Task<MIMSResponse> GetAllUsers()
        {
            try
            {
                var result = await UnitOfWork.Repository<UserGetModel>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetAllUsers]");
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> Login(UserLoginModel model)
        {
            try
            {
                var encryptedPassword = PasswordEncrypt(model.Password);
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserName", Tuple.Create(model.Username.ToString(), DbType.String, ParameterDirection.Input) },
                    { "Password", Tuple.Create(encryptedPassword.ToString(), DbType.String, ParameterDirection.Input) },
                };

                var result = (await UnitOfWork.Repository<UserReturnModel>().GetEntitiesBySPAsync("[Administration].[UserLogin]", parameters)).ToList();
                if (result.Count() > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), string.Empty, result);
                }
                
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<MIMSResponse> Registration(UserRegistrationInsertModel model)
        {
            var lastrecordValue = await GetLastQRCodeNumber();
            var lastNumber = (int)lastrecordValue.Data;
            int incrementedNum;
            if (lastNumber != 0)
            {
                incrementedNum = lastNumber + 1;
            }
            else
            {
                incrementedNum = 01000000;
            }
            var passwordEncrypted = PasswordEncrypt(model.Password);
            if (model.UserTypeID == 2)
            {
                var configath = configuration.GetSection("UserImagePath:Path").Value;
                var directoryPath = configuration.GetSection("UserImagePath:Directry").Value;
                var baseLink = configuration.GetSection("UserImagePath:FileLinkBase").Value;
                int DonorID = await UnitOfWork.Repository<UserRegistrationInsertModel>().SaveDonor(model, configath, directoryPath, baseLink, passwordEncrypted, incrementedNum);
                if (DonorID > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, DonorID);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), string.Empty, DonorID);
                }
            }
            else
            {
                var configath = configuration.GetSection("UserImagePath:Path").Value;
                var directoryPath = configuration.GetSection("UserImagePath:Directry").Value;
                var baseLink = configuration.GetSection("UserImagePath:FileLinkBase").Value;
                int SeekerID = await UnitOfWork.Repository<UserRegistrationInsertModel>().SaveSeeker(model, configath, directoryPath, baseLink, passwordEncrypted, incrementedNum);
                if (SeekerID > 0)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, SeekerID);
                }
                else
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Error.ToString(), string.Empty, SeekerID);
                }
            }
        }

        public async Task<MIMSResponse> GetUserDetailsByUserID(int UserID)
        {
            try
            {
                var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                {
                    { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                };

                var result = await UnitOfWork.Repository<UserGetModel>().GetEntityBySPAsync("[Administration].[GetUserDetailsByUserID]", parameters);
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public string PasswordEncrypt(string Password) 
        {
            string Key = "adef@@kfxcbv@";

            if (string.IsNullOrEmpty(Password)) return "";
            Password += Key;

            var passwordBytes = Encoding.UTF8.GetBytes(Password);
            return Convert.ToBase64String(passwordBytes);
        }
        public string PasswordDecrypt(string Password)
        {
            string Key = "adef@@kfxcbv@";

            if (string.IsNullOrEmpty(Password)) return "";
            var base64EncodeBytes = Convert.FromBase64String(Password);
            var result = Encoding.UTF8.GetString(base64EncodeBytes);
            result = result.Substring(0, result.Length - Key.Length);
            return result;
        }

        public async Task<MIMSResponse> GetUserImageByUserID(int UserID)
        {
            if (UserID != 0)
            {
                try
                {
                    var parameters = new Dictionary<string, Tuple<string, DbType, ParameterDirection>>
                    {
                        { "UserID", Tuple.Create(UserID.ToString(), DbType.Int32, ParameterDirection.Input) }
                    };

                    var result = await UnitOfWork.Repository<GetUserImageModel>().GetEntityBySPAsync("[Administration].[GetUserImageByUserID]", parameters);
                    byte[] imageArray = File.ReadAllBytes(Path.Combine(result.Image));
                    result.Image = Convert.ToBase64String(imageArray);
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, result);

                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else
            {
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, null);
            }
            
        }

        public async Task<MIMSResponse> GetLastQRCodeNumber()
        {
            try
            {
                var result = await UnitOfWork.Repository<GetLastQRTagNumber>().GetEntitiesBySPAsyncWithoutParameters("[Administration].[GetLastQRTagNumber]");
                var firstItem = result.FirstOrDefault();
                if (firstItem != null)
                {
                    return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, firstItem.QRTagNumber);
                }
                return MIMSResponse.GenerateResponseMessage(MIMSResponseEnum.Success.ToString(), string.Empty, 0);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }

}
