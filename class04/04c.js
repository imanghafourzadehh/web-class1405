import { createServer } from "http";
//import { writeFile  } from "node:fs";
import { readFile  } from "node:fs";
let controller = [
    {
        name: "/sum",
        func: function (request, response) {
            console.log("this is for test");
            response.writeHead(200);
            let num = request.url.split("/");
            let result = Number(num[2]) + Number(num[3]);
            response.write(result.toString());
            response.end();
        }
    }, 
    {
        name: "/readFile",
        func: function (request, response) {
            let file = request.url.split("/");
            readFile(file[2],function(error,data) {
                if (error) {
                    let error = "readfile fail";
                    response.writeHead(400);
                    response.write(error);
                    response.end();
                    
                }
                else{
                    console.log("readfile successfully");
                    response.write(data);
                    response.end();
                }
                
            });
            
        }
    }
]; 

function Responses(request, response) {
    for (const ctrl of controller) {
        if (request.url.startsWith(ctrl.name)) {
            ctrl.func(request, response);
            break;
        }
    }
}

let server = createServer(Responses);
server.listen(8080);