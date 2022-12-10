 const jwt = require("jsonwebtoken");

 const token = jwt.sign({ test:true }, "secret_key");

 console.log(token)

 const decoded = jwt.decode(token, "secret_keys")

 console.log(decoded)