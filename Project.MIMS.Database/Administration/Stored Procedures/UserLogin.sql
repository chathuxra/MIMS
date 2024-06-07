-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-04-01>
-- Description:	<Description,,User Login>
-- =============================================
CREATE PROCEDURE [Administration].[UserLogin]
	@UserName VARCHAR(50),
	@Password VARCHAR(50)

AS
BEGIN
	SELECT UserID, UserName, UserType
	FROM [Administration].[User]
	WHERE UserName LIKE '%' + @UserName + '%'
	AND Password = @Password
	AND IsActive = 1 -- Active
END