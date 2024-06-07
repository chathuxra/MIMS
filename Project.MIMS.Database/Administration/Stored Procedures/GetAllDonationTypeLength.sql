-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-06>
-- Description:	<Description,, GetAllDonationTypeLength>
-- =============================================
CREATE PROCEDURE [Administration].[GetAllDonationTypeLength]

AS
BEGIN
	SELECT DonationTypeID, DonationTypeName
	FROM [Administration].[DonationType]
	WHERE IsActive = 1 --Active
END