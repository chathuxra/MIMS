CREATE TABLE [Administration].[Donor] (
    [DonorID]        INT           IDENTITY (1, 1) NOT NULL,
    [UserID]         INT           NULL,
    [NIC]            VARCHAR (50)  NULL,
    [FirstName]      VARCHAR (50)  NULL,
    [LastName]       VARCHAR (50)  NULL,
    [Gender]         INT           NULL,
    [DOB]            DATETIME      NULL,
    [Address]        VARCHAR (MAX) NULL,
    [DonationTypeID] INT           NULL,
    [IsActive]       BIT           NOT NULL,
    [CreatedBy]      INT           NULL,
    [CreatedDate]    DATETIME      NULL,
    [ModifiedBy]     INT           NULL,
    [ModifiedDate]   DATETIME      NULL,
    CONSTRAINT [PK_Donor] PRIMARY KEY CLUSTERED ([DonorID] ASC)
);

