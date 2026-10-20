import { count } from "console";
import { createServer, request } from "http";
function serverCallBack(requset,response) {
    console.log ("this is a test")
    console.log("url",requset.url)
    response.writeHead(200)
    let word = requset.url.split("/");
    if (word[1]==="sum") {
        response.write((Number(word[2])+ Number(word[3])).toString())
    }
    else if( word[1]==="minus"){
        response.write((Number(word[2]) - Number(word[3])).toString()) 
    }
    else {
        response.write("wooooo")
    }
    response.end();
}
let server = createServer(serverCallBack);
server.listen(8080);
