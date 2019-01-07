/**
Powershell Script
**/
const shell = require('node-powershell') //Powershell in Node.js
module.exports = (sections) => {
  let User = {};
  //Handle DD Webhook Data
  sections.map(section => {return section.fields})
          .reduce(function(accumulator, currentValue) {
              return accumulator.concat(currentValue);
          },[])
          .map(field => User[field.name] = field.value)

//PS configuration
  let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  // Add
  ps.addCommand(`$Attributes = @{

     Enabled = $true
     ChangePasswordAtLogon = $true

     UserPrincipalName = "${User.Username}@pdqlabs.org"
     Name = "${User.Username}"
     GivenName = "${User["First Name"]}"
     Surname = "${User["Last Name"]}"
     DisplayName = "${User["First Name"]} ${User["Last Name"]}"
     Description = "This is the account for the test guy."
     Office = "No office for test guy."

     Company = "PDQ.com"
     Department = "IT"
     Title = "Some guy"
     City = "Salt Lake City"
     State = "Utah"

     AccountPassword = "${User.Password}" | ConvertTo-SecureString -AsPlainText -Force

  }

  New-ADUser @Attributes`)

  // Execute
  ps.invoke()

  //Do something with the Output...
  .then(output => {
    console.log(output);
    ps.dispose()
  })

  // Do something with the error...
  .catch(err => {
    console.log(err);
    ps.dispose();
  });

}
