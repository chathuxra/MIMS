CREATE TABLE [Administration].[DonationType] (
    [DonationTypeID]   INT          IDENTITY (1, 1) NOT NULL,
    [DonationTypeName] VARCHAR (50) NULL,
    [IsActive]         BIT          NOT NULL,
    [CreatedBy]        INT          NULL,
    [CreatedDate]      DATETIME     NULL,
    [ModifiedBy]       INT          NULL,
    [ModifiedDate]     DATETIME     NULL,
    CONSTRAINT [PK_DonationType] PRIMARY KEY CLUSTERED ([DonationTypeID] ASC)
);

