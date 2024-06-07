-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-15>
-- Description:	<Description,,Get All Seeker Length>
-- =============================================
CREATE PROCEDURE [Administration].[GetAllSeekerLength]
	
AS
BEGIN
	SELECT SeekerID, FirstName 
	FROM [Administration].[Seeker]
	WHERE IsActive = 1 --Active
END