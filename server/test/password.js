const bcrypt = require("bcryptjs")

const passwordEnteredByUser = "BlackRebelion?9"
const hashed = "$2a$10$K3ANUk3w6.cjAtwLZnLJ1ejQ1byDajvSMdigCe89Qy.PIv4FxLsyC"


var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(passwordEnteredByUser, salt);
console.log(hash)


bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
})
