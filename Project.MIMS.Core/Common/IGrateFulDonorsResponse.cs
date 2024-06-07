using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Common
{
    public interface IMIMSResponse
    {
        MIMSResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary);
        MIMSResponse GenerateResponseMessage(string statusCode, string message, object data);
        MIMSResponse GenerateResponseMessage(string statusCode, string message);
        MIMSResponse GenerateResponseMessage(object data);
    }
}
