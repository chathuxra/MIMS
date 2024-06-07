using Dapper;
using Dapper.Contrib.Extensions;
using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.DataAccess.Dapper
{
    public class Repository<TEntity> : IRepositoryAsync<TEntity> where TEntity : class
    {
        private IMIMSConnectionFactory connectionFactory;

        public Repository(IMIMSConnectionFactory connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        public TEntity Get(string id)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                return connection.Get<TEntity>(id);
            }
        }

        public async Task<TEntity> GetAsync(string id)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                return await connection.GetAsync<TEntity>(id);
            }
        }

        public TEntity Get(int id)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                return connection.Get<TEntity>(id);
            }
        }

        public IEnumerable<TEntity> GetAll()
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                return connection.GetAll<TEntity>();
            }
        }
        //Get all async
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                return await connection.GetAllAsync<TEntity>();
            }
        }

        public long Insert(TEntity entity)
        {
            long identity;

            //using (var transaction = new TransactionScope())
            //{
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                identity = connection.Insert(entity);
            }

            return identity;
        }

        public async Task<long> InsertAsync(TEntity entity)
        {
            long identity;

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                identity = await connection.InsertAsync(entity);
            }

            return identity;
        }

        public bool Update(TEntity entity)
        {
            bool isSuccess;

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                isSuccess = connection.Update(entity);
            }

            return isSuccess;
        }

        public async Task<bool> UpdateAsync(TEntity entity)
        {
            bool isSuccess;

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                isSuccess = await connection.UpdateAsync(entity);
            }

            return isSuccess;
        }

        public bool Delete(TEntity entity)
        {
            bool isSuccess;

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                isSuccess = connection.Delete(entity);
            }

            return isSuccess;
        }

        public async Task<bool> DeleteAsync(TEntity entity)
        {
            bool isSuccess;

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                isSuccess = await connection.DeleteAsync(entity);
            }

            return isSuccess;
        }

        public int ExecuteSP(string storedProcedureName, DynamicParameters parameters)
        {
            int affectedRows;
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                affectedRows = connection.Execute(
                        storedProcedureName,
                        param: parameters,
                        commandType: CommandType.StoredProcedure);
            }

            return affectedRows;
        }

        public int ExecuteSql(string sql, DynamicParameters parameters)
        {
            int affectedRows;
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                affectedRows = connection.Execute(
                        sql,
                        param: parameters,
                        commandType: CommandType.Text);
            }

            return affectedRows;
        }

        public IEnumerable<dynamic> QueryBySP(string storedProcedureName, DynamicParameters parameters)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                IEnumerable<dynamic> result = connection.Query(
                        storedProcedureName,
                        param: parameters,
                        commandType: CommandType.StoredProcedure);

                return result;
            }
        }

        public IEnumerable<dynamic> QueryBySql(string sql, DynamicParameters parameters)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                IEnumerable<dynamic> result = connection.Query(
                        sql,
                        param: parameters,
                        commandType: CommandType.Text);

                return result;
            }
        }

        public IEnumerable<TEntity> GetEntitiesBySP(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            try
            {
                DynamicParameters dynamicParameters = new DynamicParameters();

                foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
                {
                    if (entry.Value.Item2 == DbType.Guid)
                    {
                        Guid guid = new Guid(entry.Value.Item1);
                        dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                    }
                    else
                    {
                        dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                    }
                }

                using (var connection = connectionFactory.GetConnection())
                {
                    connection.Open();

                    IEnumerable<TEntity> result = connection.Query<TEntity>(
                                            storedProcedureName,
                                            param: dynamicParameters,
                                            commandType: CommandType.StoredProcedure);

                    return result;
                }

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<IEnumerable<TEntity>> GetEntitiesBySPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            try
            {

                if (parameters != null)
                {
                    DynamicParameters dynamicParameters = new DynamicParameters();

                    foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
                    {
                        if (entry.Value.Item2 == DbType.Guid)
                        {
                            Guid guid = new Guid(entry.Value.Item1);
                            dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                        }
                        else
                        {
                            dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                        }
                    }

                    using (var connection = connectionFactory.GetConnection())
                    {
                        connection.Open();

                        IEnumerable<TEntity> result = await connection.QueryAsync<TEntity>(
                                                storedProcedureName,
                                                param: dynamicParameters,
                                                commandType: CommandType.StoredProcedure);

                        return result;
                    }
                }
                else
                {
                    using (var connection = connectionFactory.GetConnection())
                    {
                        connection.Open();

                        IEnumerable<TEntity> result = await connection.QueryAsync<TEntity>(
                                                storedProcedureName,
                                                commandType: CommandType.StoredProcedure);

                        return result;
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<IEnumerable<TEntity>> GetEntitiesBySPAsyncWithoutParameters(string storedProcedureName)
        {
            try
            {
                using (var connection = connectionFactory.GetConnection())
                {
                    connection.Open();

                    IEnumerable<TEntity> result = await connection.QueryAsync<TEntity>(
                                                storedProcedureName,
                                                commandType: CommandType.StoredProcedure);

                    return result;
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public IEnumerable<TEntity> GetEntitiesBySql(string sql, DynamicParameters parameters)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                IEnumerable<TEntity> result = connection.Query<TEntity>(
                        sql,
                        param: parameters,
                        commandType: CommandType.Text);

                return result;
            }
        }

        public IEnumerable<TEntity> GetEntitiesBySql(string sql)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                IEnumerable<TEntity> result = connection.Query<TEntity>(
                    sql,
                    commandType: CommandType.Text);

                return result;
            }
        }

        public TEntity GetEntityBySP(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                TEntity result = connection.Query<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return result;
            }
        }

        public async Task<TEntity> GetEntityBySPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                var result = await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure);

                return result.FirstOrDefault();
            }

        }

        public async Task<int> GetIntOutPutBySPAsync(string storedProcedureName)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                var result = await connection.QueryAsync<int>(
                    storedProcedureName,
                    commandType: CommandType.StoredProcedure);

                return result.FirstOrDefault();
            }
        }

        public int ExecuteSPWithOutPut(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = connection.Query<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return dynamicParameters.Get<int>(outputName);
            }
        }

        public async Task<int> ExecuteSPWithOutPutAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = (await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();

                return dynamicParameters.Get<int>(outputName);
            }
        }

        public int ExecuteSPWithInputOutput(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {

            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output || entry.Value.Item3 == ParameterDirection.InputOutput)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = connection.Query<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return dynamicParameters.Get<int>(outputName);
            }
        }

        public async Task<int> ExecuteSPWithInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {

            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output || entry.Value.Item3 == ParameterDirection.InputOutput)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = (await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();

                return dynamicParameters.Get<int>(outputName);
            }
        }

        public int Execute(IEnumerable<Action<IDbConnection, IDbTransaction>> actions)
        {
            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                using (IDbTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {
                        foreach (var action in actions)
                        {
                            action(transaction.Connection, transaction);
                        }
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                return 0;
            }
        }

        public int ExecuteTns(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();
                using (var tran = connection.BeginTransaction())
                {
                    try
                    {
                        // multiple operations involving cn and tran here

                        tran.Commit();
                    }
                    catch
                    {
                        tran.Rollback();
                        throw;
                    }
                }
            }

            return 0;
        }

        public bool ExecuteSPWithBooleanInputOutput(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output || entry.Value.Item3 == ParameterDirection.InputOutput)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = connection.Query<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return dynamicParameters.Get<bool>(outputName);
            }
        }

        public async Task<bool> ExecuteSPWithBooleanInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output || entry.Value.Item3 == ParameterDirection.InputOutput)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = (await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();

                return dynamicParameters.Get<bool>(outputName);
            }
        }

        public void ExecuteSP(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = connection.Query<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure).FirstOrDefault();


            }
        }

        public async Task ExecuteSPAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = (await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();


            }
        }

        public IMIMSConnectionFactory GetConnectionFactory()
        {
            return connectionFactory;
        }

        public async Task<Guid> ExecuteSPWithGuidInputOutputAsync(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters)
        {

            DynamicParameters dynamicParameters = new DynamicParameters();
            DbType outputType;
            string outputName = "";

            foreach (KeyValuePair<string, Tuple<string, DbType, ParameterDirection>> entry in parameters)
            {
                if (entry.Value.Item2 == DbType.Guid)
                {
                    Guid guid = new Guid(entry.Value.Item1);
                    dynamicParameters.Add(entry.Key, guid, DbType.Guid, entry.Value.Item3);
                }
                else
                {
                    dynamicParameters.Add(entry.Key, entry.Value.Item1, entry.Value.Item2, entry.Value.Item3);
                }

                if (entry.Value.Item3 == ParameterDirection.Output || entry.Value.Item3 == ParameterDirection.InputOutput)
                {
                    outputType = entry.Value.Item2;
                    outputName = entry.Key;
                }
            }

            using (var connection = connectionFactory.GetConnection())
            {
                connection.Open();

                object result = (await connection.QueryAsync<TEntity>(
                    storedProcedureName,
                    param: dynamicParameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();

                return dynamicParameters.Get<Guid>(outputName);
            }
        }
    }
}
