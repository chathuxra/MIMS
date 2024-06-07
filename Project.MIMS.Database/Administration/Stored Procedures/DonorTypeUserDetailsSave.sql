-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-14>
-- Description:	<Description,,Donor Type User Details Save>
-- =============================================
CREATE PROCEDURE [Administration].[DonorTypeUserDetailsSave]
	@UserID INT OUTPUT,
	@UserName VARCHAR(50),
	@UserType INT,
	@Email VARCHAR(50),
	@Password VARCHAR(Max),
	@VerifyStatus INT
AS
BEGIN
	INSERT INTO [Administration].[User]
			([UserName]
			,[UserType]
			,[JoinedDate]
			,[Email]
			,[Password]
			,[VerifyStatus]
			,[IsActive]
			,[CreatedBy]
			,[CreatedDate])

		VALUES(@UserName
			,@UserType
			,GETDATE()
			,@Email
			,@Password
			,@VerifyStatus
			,1
			,1
			,GETDATE())

		SET @UserID = SCOPE_IDENTITY();

END