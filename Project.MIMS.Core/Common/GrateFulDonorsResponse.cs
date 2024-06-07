using System;
using System.Collections.Generic;
using System.Text;

namespace Project.MIMS.Core.Common
{
    public class MIMSResponse : IMIMSResponse
    {
        public string StatusCode { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public MIMSResponse GenerateResponseMessage(string statusCode, string message, Dictionary<string, object> dataHoldDictionary)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Data = dataHoldDictionary;

            return this;
        }

        public MIMSResponse GenerateResponseMessage(string statusCode, string message, object data)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            this.Data = data;
            return this;
        }

        public MIMSResponse GenerateResponseMessage(object data)
        {
            this.Data = data;
            return this;
        }

        public MIMSResponse GenerateResponseMessage(string statusCode, string message)
        {
            this.StatusCode = statusCode;
            this.Message = message;
            return this;
        }

        public MIMSResponse GenerateResponseMessage(object p1, string v, object p2)
        {
            throw new NotImplementedException();
        }
    }
}
