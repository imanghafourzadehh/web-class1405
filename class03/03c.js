import { count } from "console";
import { createServer, request } from "http";
function serverCallBack(requset,response) {
    console.log ("this is a test")
    console.log("url",requset.url)
    response.writeHead(200)
    let word = (request.url)
    let count =word.split("/");   
    console.log(Number.count[1]+Number.count[2])
    response.end
}
let server = createServer(serverCallBack);
server.listen(8080);
