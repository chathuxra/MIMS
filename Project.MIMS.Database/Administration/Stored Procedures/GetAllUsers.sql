-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-03-30>
-- Description:	<Description,,Get All Users>
-- =============================================
CREATE PROCEDURE [Administration].[GetAllUsers]
	
AS
BEGIN
	SELECT U.UserID, U.UserName,U.UserType, U.JoinedDate, U.IsActive 
	FROM [Administration].[User] U 
	WHERE U.IsActive = 1 -- Active
END