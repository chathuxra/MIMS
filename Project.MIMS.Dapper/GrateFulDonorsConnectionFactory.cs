using Project.Core.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Project.MIMS.Dapper
{
    public class MIMSConnectionFactory : IMIMSConnectionFactory
    {
        private readonly string connectionString;

        public MIMSConnectionFactory(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(this.connectionString);
        }
    }
}
