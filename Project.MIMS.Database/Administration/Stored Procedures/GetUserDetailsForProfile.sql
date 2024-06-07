-- =============================================
-- Author:		<Author,,Bimsara Attnayake>
-- Create date: <Create Date,,2023-05-19>
-- Description:	<Description,,Get User Details For Profile>
-- =============================================
CREATE PROCEDURE [Administration].[GetUserDetailsForProfile]
	@UserID INT,
	@UserType INT
AS
BEGIN
	IF(@UserType = 2)
BEGIN
	SELECT CONCAT(D.FirstName , ' ', D.LastName ) AS Name, 
	iif(U.UserType = 3, 'Seeker', 'Donor') AS UserType,
	U.Email,
	U.JoinedDate,
	D.DOB,
	D.Address,
	U.UserID,
	U.VerifyStatus,
	U.QRTagNumber
	FROM [Administration].[User] U
	INNER JOIN [Administration].[Donor] D ON D.UserID = U.UserID
	WHERE U.UserID = @UserID
END 
ELSE
BEGIN
	SELECT CONCAT(S.FirstName , ' ', S.LastName ) AS Name, 
	iif(U.UserType = 2, 'Donor', 'Seeker') AS UserType,
	U.Email,
	U.JoinedDate,
	S.DOB,
	S.Address,
	U.UserID,
	U.VerifyStatus,
	U.QRTagNumber
	FROM [Administration].[User] U
	INNER JOIN [Administration].[Seeker] S ON S.UserID = U.UserID
	WHERE U.UserID = @UserID
END
END