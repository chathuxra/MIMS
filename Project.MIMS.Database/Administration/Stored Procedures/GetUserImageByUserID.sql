-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-19>
-- Description:	<Description,,Get User Image By userID>
-- =============================================
CREATE PROCEDURE [Administration].[GetUserImageByUserID]
	@UserID INT
AS
BEGIN
	SELECT UserImageID, UserID, ImageURL AS Image 
	FROM [Administration].[UserImage]
	WHERE UserID = @UserID
END