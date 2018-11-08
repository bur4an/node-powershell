/**
Powershell Script
**/

module.exports = function adduser(user){

return `$Attributes = @{

   Enabled = $true
   ChangePasswordAtLogon = $true

   UserPrincipalName = "test.guy@pdqlabs.org"
   Name = "${user.map((data) => data.createdBy.name)}"
   GivenName = "Test"
   Surname = "Guy"
   DisplayName = "Test Guy III"
   Description = "This is the account for the third test guy."
   Office = "No office for test guy."

   Company = "PDQ.com"
   Department = "IT"
   Title = "Some guy"
   City = "Salt Lake City"
   State = "Utah"

   AccountPassword = "TotallyFakePassword123" | ConvertTo-SecureString -AsPlainText -Force

}

New-ADUser @Attributes`

};
