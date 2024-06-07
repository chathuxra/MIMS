-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-15>
-- Description:	<Description,, Save Donor Details>
-- =============================================
CREATE PROCEDURE [Administration].[SaveDonorDetails]
	@DonorID INT OUTPUT,
	@UserID INT,
	@NIC VARCHAR(50),
	@FirstName VARCHAR(50),
	@LastName VARCHAR(50),
	@Gender INT,
	@DOB DATETIME,
	@Address VARCHAR(MAX),
	@DonationTypeID INT
AS
BEGIN
	INSERT INTO [Administration].[Donor]
			([UserID]
			,[NIC]
			,[FirstName]
			,[LastName]
			,[Gender]
			,[DOB]
			,[Address]
			,[DonationTypeID]
			,[IsActive]
			,[CreatedBy]
			,[CreatedDate])
		VALUES(@UserID
			,@NIC
			,@FirstName
			,@LastName
			,@Gender
			,@DOB
			,@Address
			,@DonationTypeID
			,1
			,1
			,GETDATE())

		SET @DonorID = SCOPE_IDENTITY();
END