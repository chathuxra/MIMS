-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-06>
-- Description:	<Description,,Get Donation Types For The Drop Down>
-- =============================================
CREATE PROCEDURE [Administration].[GetDonationTypesForTheDropDown]
	
AS
BEGIN
	SELECT DonationTypeName, DonationTypeID, IsActive 
	FROM [Administration].[DonationType]
END