using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core.Data
{
    public interface IRepositoryAsync<TEntity> : IRepository<TEntity> where TEntity : class
    {
        Task<TEntity> GetAsync(string id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<int> GetIntOutPutBySPAsync(string storedProcedureName);
        Task<long> InsertAsync(TEntity entity);

        Task<bool> UpdateAsync(TEntity entity);
        Task<bool> DeleteAsync(TEntity entity);

        Task<IEnumerable<TEntity>> GetEntitiesBySPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
        Task<TEntity> GetEntityBySPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);

        Task<int> ExecuteSPWithInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);

        Task<int> ExecuteSPWithOutPutAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);

        Task ExecuteSPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
        Task<bool> ExecuteSPWithBooleanInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
        Task<IEnumerable<TEntity>> GetEntitiesBySPAsyncWithoutParameters(string storedProcedureName);
        Task<Guid> ExecuteSPWithGuidInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
    }
}
