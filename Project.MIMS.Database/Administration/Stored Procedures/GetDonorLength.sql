-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-15>
-- Description:	<Description,,Get Donor Length>
-- =============================================
CREATE PROCEDURE [Administration].[GetDonorLength]
	
AS
BEGIN
	SELECT DonorID, FirstName
	FROM [Administration].[Donor]
	WHERE IsActive = 1 -- Active
END