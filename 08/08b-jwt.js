import jwt from "jsonwebtoken";
let secret = "dgjdjkgjkdgkgj"
let x= {
    a:1
}
let signed = jwt.sign(x,secret);
console.log(signed)