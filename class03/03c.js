import { count } from "console";
import { createServer, request } from "http";
function serverCallBack(requset,response) {
    console.log ("this is a test")
    console.log("url",requset.url)
    response.writeHead(200)
    let word = requset.url.split("/");
    response.write((Number(word[1])+ Number(word[2])).toString());
    response.end();
}
let server = createServer(serverCallBack);
server.listen(8080);
