using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Project.Core.Data
{
    public interface IUnitOfWork
    {
        object GetDataBySql(string sql);

        object GetEntitiesBySP(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);

        int GetStatusByExecuteSP(string storedProcedureName, Dictionary<string, Tuple<string, DbType, ParameterDirection>> parameters);
    }
}
