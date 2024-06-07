-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-15>
-- Description:	<Description,,Save User Image>
-- =============================================
CREATE PROCEDURE [Administration].[SaveUserImage]
	@UserImageID INT OUTPUT,
	@UserID INT,
	@ImageURL VARCHAR(MAX),
	@ImageLink VARCHAR(MAX),
	@Image VARCHAR(MAX),
	@DocumentTypeID INT
AS
BEGIN
	INSERT INTO [Administration].[UserImage]
			([UserID]
			,[ImageURL]
			,[ImageLink]
			,[Image]
			,[DocumentTypeID]
			,[IsActive]
			,[CreatedBy]
			,[CreatedDate])
	 VALUES(@UserID
			,@ImageURL
			,@ImageLink
			,@Image
			,@DocumentTypeID
			,1 -- Active
			,1
			,GETDATE())
	SET @UserImageID = SCOPE_IDENTITY();
END