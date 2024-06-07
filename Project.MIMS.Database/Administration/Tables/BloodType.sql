CREATE TABLE [Administration].[BloodType] (
    [BloodTypeID]   INT          IDENTITY (1, 1) NOT NULL,
    [BloodTypeName] VARCHAR (50) NULL,
    [IsActive]      BIT          NOT NULL,
    [CreatedBy]     INT          NULL,
    [CreatedDate]   DATETIME     NULL,
    [ModifiedBy]    INT          NULL,
    [ModifiedDate]  DATETIME     NULL,
    CONSTRAINT [PK_BloodType] PRIMARY KEY CLUSTERED ([BloodTypeID] ASC)
);

