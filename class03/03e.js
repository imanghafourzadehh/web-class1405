import { count } from "console";
import { createServer, request } from "http";
let controllers =[
    {
        name: "sum",
        func: function sum(input,response){
            response.write("sum is:"+( Number(input[2]) + Number(input[3])))
        }
    },
    {
        name: "minus",
        func: function minus(input,response){
            response.write("result is:"+( Number(input[2]) - Number(input[3])))    
        }
        
    },
    
    
]
function serverCallBack(request,response) {
    console.log ("this is a test")
    console.log("url",request.url)
    response.writeHead(200)
    let word = request.url.split("/");
    let check=false
    for (let i = 0; i < controllers.length; i++) {
        if (request.url.startsWith("/"+controllers[i].name)) {
            check=true
            controllers[i].func(word,response);
            break;
        }
        
    }
    response.end();
}
let server = createServer(serverCallBack);
server.listen(8080);
