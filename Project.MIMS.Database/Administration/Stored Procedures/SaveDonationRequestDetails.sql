-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-18>
-- Description:	<Description,, Save Donation Request Detaisls>
-- =============================================
CREATE PROCEDURE [Administration].[SaveDonationRequestDetails]
	@DonationRequestID INT OUTPUT,
	@SeekerID INT,
	@DonationTypeID INT,
	@Description VARCHAR(MAX),
	@RequiredBefore DATETIME,
	@Amount DECIMAL(18, 2),
	@BloodType INT,
	@DonationRequestStatus INT
AS
BEGIN
	INSERT INTO [Administration].[DonationRequest]
		([SeekerID]
		,[DonationTypeID]
		,[Description]
		,[RequestBefore]
		,[Amount]
		,[BloodType]
		,[IsActive]
		,[CreatedDate]
		,[DonationRequestStatus])
	VALUES(@SeekerID
		,@DonationTypeID
		,@Description
		,@RequiredBefore
		,@Amount
		,@BloodType
		,1
		,GETDATE()
		,@DonationRequestStatus)
	SET @DonationRequestID = SCOPE_IDENTITY();
END