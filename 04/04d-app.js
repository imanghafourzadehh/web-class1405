import framework from './04d-framework.js';
import {writeFile,readFile,unlink,rmdir} from "node:fs";

const app = framework();
const port = 3000;

app.get('sum', function (request, response){
    let items = request.url.split("/");
    response.writeHead(200);
    response.write((Number(items[2]) + Number(items[3])).toString());
    response.end();
});

app.get('readfile', function (request, response){
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
});

app.get('creatfile', function (request, response){

            let file = request.url.split("/");
            writeFile(file[2], file[3], function(errr) {

                if (errr) {
                    console.log("err",errr)
                    let result = "created file fail";
                    response.writeHead(500);
                    response.write(result);
                    response.end();
                    
                }
                console.log("created file successfully");
            });
            let result = "created file successfully";
            response.writeHead(200);
            response.write(result);
            response.end();
});

app.get('/unlink', function (request, response) {
    let file = request.url.split("/");
    
    unlink(file[2], function (errr) {
        if (errr) {
            console.log("err", errr);
            let result = "delete file fail";
            response.writeHead(500);
            response.write(result);
            response.end();
        } else { 
            let result = "delete file successfully";
            response.writeHead(200);
            response.write(result);
            response.end();
        } 
    }); 
});

app.get('/delete', function (request, response) {
    let file = request.url.split("/");
    fs.rm(file[2], { recursive: true, force: true }, function(errr) {
        if (errr) {
            console.log("err", errr);
            let result = "delete folder fail";
            response.writeHead(500);
            response.write(result);
            response.end();
        } else { 
            let result = "delete successfully";
            response.writeHead(200);
            response.write(result);
            response.end();
        } 
    }); 
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





           