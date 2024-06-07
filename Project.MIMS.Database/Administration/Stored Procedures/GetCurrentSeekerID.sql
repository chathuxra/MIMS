-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-18>
-- Description:	<Description,, Get Seeker ID By User ID>
-- =============================================
CREATE PROCEDURE [Administration].[GetCurrentSeekerID] 
	@UserID INT
AS
BEGIN
	SELECT S.SeekerID
	FROM [Administration].[Seeker] S
	INNER JOIN [Administration].[User] U ON U.UserID = S.UserID
	WHERE U.UserID = @UserID
END