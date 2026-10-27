import { createServer } from "http";
import { writeFile } from "node:fs";

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
        name: "/createFile",
        func: function (request, response) {
            let file = request.url.split("/");
            writeFile(file[2], file[3], function(error) {
                if (error) {
                    let error = "created file fial";
                    response.writeHead(400);
                    response.write(error);
                    response.end();
                    
                }
                else{
                    console.log("created file successfully");
                    response.write("File created successfully");
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