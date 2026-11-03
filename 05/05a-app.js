import framework from './05a-framwork.js';
import { writeFile, readFile, unlink, rm, statSync } from "node:fs";

const app = framework();
const port = 3000;

app.get('/sum', function (request, response){
    let items = request.url.split("/");
    response.writeHead(200);
    response.write((Number(items[2]) + Number(items[3])).toString());
    response.end();
});

app.get('/readfile', function (request, response){
    let file = request.url.split("/");
    readFile(file[2],function(error,data) {
        if (error) {
            response.writeHead(400);
            response.write("readfile fail");
            response.end();
            return;
        }
        else{
            console.log("readfile successfully");
            response.write(data);
            response.end();
        }
    });
});

app.get('/createfile', function (request, response){
    let file = request.url.split("/");
    writeFile(file[2], file[3], function(errr) {
        if (errr) {
            console.log("err",errr);
            response.writeHead(500);
            response.write("created file fail");
            response.end();
            return;
        }
        console.log("created file successfully");
        response.writeHead(200);
        response.write("created file successfully");
        response.end();
    });
});

app.get('/unlink', function (request, response) {
    let file = request.url.split("/");

    unlink(file[2], function (errr) {
        if (errr) {
            console.log("err", errr);
            response.writeHead(500);
            response.write("delete file fail");
            response.end();
        } else {
            response.writeHead(200);
            response.write("delete file successfully");
            response.end();
        }
    });
});

app.get("/delete", (req, res) => {
    let file = req.url.split("/")
    try {
        if (statSync(file[2]).isDirectory()) {
            rm(file[2], { recursive: true, force: true }, (err) => {
                if (err) {
                    res.writeHead(500)
                    res.write("Error: " + err)
                } else {
                    res.writeHead(200)
                    res.write(`${file[2]} deleted`)
                }
                res.end();
            })} else if (statSync(file[2]).isFile()) {
            unlink(file[2], (err) => {
                if (err) {
                    res.writeHead(500)
                    res.write("Error: " + err)
                } else {
                    res.writeHead(200)
                    res.write(`${file[2]} deleted`)
                }
                res.end();
            })}
    } catch (err){
        res.writeHead(404)
        res.write("file not found")
        res.end();
}})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});