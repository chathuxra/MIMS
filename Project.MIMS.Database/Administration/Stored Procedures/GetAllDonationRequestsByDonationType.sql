-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,, Get All Donation Requests By DonationType>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Administration].[GetAllDonationRequestsByDonationType]
	@DonationTypeID INT
AS
BEGIN
	SELECT 
		DR.DonationRequestID,
		DT.DonationTypeName, 
		CONCAT(S.FirstName, ' ', S.LastName) AS Name,
		U.ContactNumber,
		BT.BloodTypeName,
		DR.Amount,
		DR.RequestBefore
	FROM [Administration].[User] U
		INNER JOIN [Administration].[Seeker] S ON S.UserID = U.UserID
		INNER JOIN [Administration].[DonationRequest] DR ON DR.SeekerID = S.SeekerID
		INNER JOIN [Administration].[DonationType] DT ON DT.DonationTypeID = DR.DonationTypeID
		LEFT JOIN [Administration].[BloodType] BT ON BT.BloodTypeID = DR.BloodType
		WHERE DR.DonationTypeID = @DonationTypeID
END