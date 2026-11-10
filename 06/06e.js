import { framework }  from './06a-framwork.js';
import { writeFile, readFile, unlink, rmdir } from 'node:fs';
import { json } from 'stream/consumers';
import { request } from 'node:http';

const app = framework();
const port = 3000;

app.get('sum', function(request, response){
    let items = request.url.split("/");
    response.writeHead(200);
    response.write((Number(items[2]) + Number(items[3])).toString());
    response.end();
});

app.get('createFile', function (request, response){
    let items = request.url.split("/");

    writeFile(items[2], items[3], function(error){
        if(error){
            console.log('error', error);
            response.writeHead(500);
            response.write("createFile error");
            response.end();
        }
        else{
            console.log(3);
            console.log("createFile done");

            response.writeHead(200);
            response.write("createFile done");
            response.end();
            console.log(4);
        }                
    });
});

app.get('readFile', function (request, response){
    let items = request.url.split("/");

    readFile(items[2], function(error, body){
        if(error){
            response.writeHead(500);
            response.write("readFile error");
            response.end();
        }
        else{
            console.log("readFile done");

            response.writeHead(200);
            response.write(body);
            response.end();
        }                
    });
});

app.get('deleteFile', function(request, response){
    let items = request.url.split("/");

    unlink(items[2], function(error){
        if(error){
            console.log("deleteFile error", error);

            response.writeHead(500);
            response.write("deleteFile error");
            response.end();
        }
        else{
            console.log("deleteFile done");

            response.writeHead(200);
            response.write("deleteFile done");
            response.end();
        }
    });
});

app.get('delete', function(request, response){
    let items = request.url.split("/");

    unlink(items[2], function(error){
        if(error){
            console.log("deleteFile error", error);
            if(error.code === 'EPERM'){
                rmdir(items[2], function(error){
                    if(error){
                        console.log("delete error", error);

                        response.writeHead(500);
                        response.write("delete error");
                        response.end();
                    }
                    else{
                        console.log("delete done (folder)");

                        response.writeHead(200);
                        response.write("delete done");
                        response.end();
                    }
                });
            }
        }
        else{
            console.log("delete done (file)");

            response.writeHead(200);
            response.write("delete done");
            response.end();
        }
    });

});

app.get('signup', function(request, response){
    let items = request.url.split("/");

    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error)
            response.writeHead(200);
            response.write("error reading db.json");
            response.end();
        }
        else{
            function getRandomInt(max){
                return Math.floor(Math.random()*max)
            }
            fileData = fileData.toString();
            fileData=JSON.parse(fileData);
            fileData.id.push((10000000,getRandomInt,1000000).toString())
            fileData.data.push(request.data)
            let newData = JSON.stringify(fileData)
            writeFile('db.json', newData, function(error){
                if(error){
                    console.log("error writing db.json", error)

                    response.writeHead(500);
                    response.write("signup error");
                    response.end();
                }
                else{
                    console.log("signup done");

                    response.writeHead(200);
                    response.write("signup done");
                    response.end();
                }
            });
        }
    });



});
app.get("getUser",function(request,response)
{
    let items = request.url.split("/");
    let userid = items[2];
    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error)
            response.writeHead(200);
            response.write("error reading db.json");
            response.end();
        }
        else{
            fileData=fileData.toString();
            fileData=JSON.parse(fileData)
            let found = false;
            for(let x of userid)
            {
                if (x.id === userid) {
                    found = true;
                    response.writeHead(200)
                    response.write(JSON.stringify(x))
                    response.end();
                }

            }
            if (! found) {
                response.writeHead(404)
                response.write("user not found")
                response.end();
            }
        }
    })
   
});
app.get('removeuser'),function(request,response)
{
    let items = request.url.split("/");
    let userid = items[2];
    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error)
            response.writeHead(200);
            response.write("error reading db.json");
            response.end();
        }
        else{
            fileData=fileData.toString();
            fileData=JSON.parse(fileData)
            let found = false;
            for (let i=0;i<fileData.data.length;i++){
                if (fileData.data[i].id === userid){
                    found=true
                    fileData.data.splice(i,1)
                }
            }
            if (!found){}
            else{
                fileData=JSON.stringify(fileData)
                writeFile('db.json', newData, function(error){
                    if(error){
                        console.log("error reading db.json", error)
    
                        response.writeHead(500);
                        response.write(" error reading db.json ");
                        response.end();
                    }
                    else{
                        console.log("reamoveuser done");
    
                        response.writeHead(200);
                        response.write("removeuser done");
                        response.end();
                    }
                }
                )
            }
        }
    }
)};
app.get('editeuser',function(request,response){
    
    let userid =request.data.id;
    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error)
            response.writeHead(200);
            response.write("error reading db.json");
            response.end();}
            else{
                fileData=fileData.toString();
                fileData=JSON.parse(fileData);
                let found=false;
                for (let i=0;i<fileData.data.length;i++){
                    if (fileData.data[i].id === userid){
                        found=true
                        fileData.data.splice(i,1,request.data)
                    }
                }
                if (!found) {
                    response.writeHead(404)
                    response.write("user not found")
                    response.end();
                }
                else{
                    fileData=JSON.stringify(fileData)
                    writeFile('db.json', newData, function(error){
                        if(error){
                            console.log("error reading db.json", error)
        
                            response.writeHead(500);
                            response.write(" error reading db.json ");
                            response.end();
                        }
                        else{
                            console.log("update done");
                            response.writeHead(200);
                            response.write("update done");
                            response.end();
                        }
                    })   
             }}
        })
})
app.listen(port, function(){
  console.log('app listening on port: ', port);
});