using Project.Core.Data;
using Project.DataAccess.Dapper;
using Project.MIMS.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Dapper
{
    public class MIMSUnitOfWork : UnitOfWork, IMIMSUnitOfWork
    {
        public MIMSUnitOfWork(IMIMSConnectionFactory ConnectionFactory) : base(ConnectionFactory) { }
    }
}
