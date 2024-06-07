CREATE TABLE [Administration].[GrateFulUserType] (
    [UserTypeID]   INT          IDENTITY (1, 1) NOT NULL,
    [UserTypeName] VARCHAR (50) NOT NULL,
    [IsActive]     BIT          NOT NULL,
    [CreatedBy]    INT          NULL,
    [CreatedDate]  DATETIME     NULL,
    [ModifiedBy]   INT          NULL,
    [ModifiedDate] DATETIME     NULL,
    CONSTRAINT [PK_GrateFulUserType] PRIMARY KEY CLUSTERED ([UserTypeID] ASC)
);

