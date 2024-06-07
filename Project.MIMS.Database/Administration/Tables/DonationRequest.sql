CREATE TABLE [Administration].[DonationRequest] (
    [DonationRequestID]     INT             IDENTITY (1, 1) NOT NULL,
    [DonationTypeID]        INT             NULL,
    [SeekerID]              INT             NOT NULL,
    [Description]           VARCHAR (MAX)   NULL,
    [RequestBefore]         DATETIME        NULL,
    [Amount]                DECIMAL (18, 2) NULL,
    [BloodType]             INT             NULL,
    [DonationRequestStatus] INT             NULL,
    [IsActive]              BIT             NOT NULL,
    [CreatedBy]             INT             NULL,
    [CreatedDate]           DATETIME        NULL,
    [ModifiedBy]            INT             NULL,
    [ModifiedDate]          DATETIME        NULL,
    CONSTRAINT [PK_DonationRequest] PRIMARY KEY CLUSTERED ([DonationRequestID] ASC)
);



