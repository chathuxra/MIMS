CREATE TABLE [Administration].[UserImage] (
    [UserImageID]    INT           IDENTITY (1, 1) NOT NULL,
    [UserID]         INT           NULL,
    [ImageURL]       VARCHAR (MAX) NULL,
    [ImageLink]      VARCHAR (MAX) NULL,
    [Image]          VARCHAR (MAX) NULL,
    [DocumentTypeID] INT           NULL,
    [IsActive]       BIT           NOT NULL,
    [CreatedBy]      INT           NULL,
    [CreatedDate]    DATETIME      NULL,
    [ModifiedBy]     INT           NULL,
    [ModifiedDate]   DATETIME      NULL,
    CONSTRAINT [PK_UserImage] PRIMARY KEY CLUSTERED ([UserImageID] ASC)
);

