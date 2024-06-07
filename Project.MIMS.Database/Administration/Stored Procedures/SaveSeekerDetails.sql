-- =============================================
-- Author:		<Author,,Bimsara Attanayake>
-- Create date: <Create Date,,2023-05-15>
-- Description:	<Description,,Save Seeker Details>
-- =============================================
CREATE PROCEDURE [Administration].[SaveSeekerDetails]
	@SeekerID INT OUTPUT,
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
	INSERT INTO [Administration].[Seeker]
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

		SET @SeekerID = SCOPE_IDENTITY();
END