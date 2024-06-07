-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-17>
-- Description:	<Description,, Update User Verification Status>
-- =============================================
CREATE PROCEDURE [Administration].[UpdateVerifyStatus] 
	@UserID INT,
	@UserType INT,
	@VerifyStatus INT,
	@Result INT OUTPUT
AS
BEGIN
	UPDATE [Administration].[User]
	SET [VerifyStatus] = @VerifyStatus,
		[ModifiedBy] = 1,
		[ModifiedDate] = GETDATE()
	WHERE UserID = @UserID

	SET @Result = @@ROWCOUNT
END