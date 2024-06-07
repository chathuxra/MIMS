using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IUnitOfWorkAsync : IUnitOfWork
    {
        IRepositoryAsync<TEntity> Repository<TEntity>() where TEntity : class;

        Task<object> GetDataBySqlAsync(string sql);

        Task<int> GetStatusByExecuteSPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);

        Task<object> GetEntitiesBySPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
    }
}
