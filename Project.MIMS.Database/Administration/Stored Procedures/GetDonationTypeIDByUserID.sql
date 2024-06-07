-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,>
-- Description:	<Description,,Get Donation Type ID By UserID>
-- =============================================
CREATE PROCEDURE [Administration].[GetDonationTypeIDByUserID] 
	@UserID INT
AS
BEGIN
	SELECT DonationTypeID 
	FROM [Administration].[Donor]
	WHERE UserID = @UserID
END