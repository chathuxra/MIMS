-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-04-03>
-- Description:	<Description,,Get User Details By UserID>
-- =============================================
CREATE PROCEDURE [Administration].[GetUserDetailsByUserID]
	@UserID INT
AS
BEGIN
	SELECT U.UserID, U.UserName,U.UserType, U.JoinedDate, U.IsActive , U.Email
	FROM [Administration].[User] U 
	WHERE U.UserID = @UserID
END