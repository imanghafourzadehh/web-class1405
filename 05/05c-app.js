import framework from './05b-framwork.js';
import { writeFile, readFile, unlink, rm } from "node:fs";

const app = framework();
const port = 3000;

app.get('/sum', function (request, response) {
    let items = request.url.split("/");
    const a = Number(items[2]);
    const b = Number(items[3]);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        response.writeHead(400);
        response.write("invalid numbers");
        response.end();
        return;
    }

    response.writeHead(200);
    response.write((a + b).toString());
    response.end();
});
app.get('/readfile', function (request, response) {
    let file = request.url.split("/");

    if (!file[2]) {
        response.writeHead(400);
        response.write("file path is required");
        response.end();
        return;
    }

    readFile(file[2], function (error, data) {
        if (error) {
            response.writeHead(400);
            response.write("readfile fail: " + error.message);
            response.end();
            return;
        }
        response.writeHead(200);
        response.write(data);
        response.end();
    });
});
app.get('/createfile', function (request, response) {
    let items = request.url.split("/");

    if (!items[2]) {
        response.writeHead(400);
        response.write("file name is required");
        response.end();
        return;
    }
    const content = items.slice(3).join("/");

    writeFile(items[2], content, function (err) {
        if (err) {
            response.writeHead(500);
            response.write("created file fail: " + err.message);
            response.end();
            return;
        }
        response.writeHead(200);
        response.write("created file successfully");
        response.end();
    });
});
app.get('/unlink', function (request, response) {
    let file = request.url.split("/");

    if (!file[2]) {
        response.writeHead(400);
        response.write("file path is required");
        response.end();
        return;
    }

    unlink(file[2], function (err) {
        if (err) {
            response.writeHead(500);
            response.write("delete file fail: " + err.message);
            response.end();
            return;
        }
        response.writeHead(200);
        response.write("delete file successfully");
        response.end();
    });
});
app.get('/delete', function (request, response) {
    let file = request.url.split("/");

    if (!file[2]) {
        response.writeHead(400);
        response.write("path is required");
        response.end();
        return;
    }

    rm(file[2], { recursive: true, force: true }, function (err) {
        if (err) {
            response.writeHead(500);
            response.write("delete fail: " + err.message);
            response.end();
            return;
        }
        response.writeHead(200);
        response.write("delete successfully");
        response.end();
    });
});


app.get('/signup', function (request, response) {
    if (!request.data) {
        response.writeHead(400);
        response.write("body is required (send JSON with -d)");
        response.end();
        return;
    }

    let newUser;
    try {
        newUser = JSON.parse(request.data);
    } catch (e) {
        response.writeHead(400);
        response.write("invalid JSON body");
        response.end();
        return;
    }

    
    readFile('db.json', function (error, body) {
        let users = [];
        if (!error && body.toString().trim() !== '') {
            try {
                users = JSON.parse(body.toString());
            } catch (e) {
                users = [];   
            }
        }

        users.push(newUser);

        writeFile('db.json', JSON.stringify(users, null, 2), function (err) {
            if (err) {
                response.writeHead(500);
                response.write("signup error: " + err.message);
                response.end();
                return;
            }
            response.writeHead(200);
            response.write("signup done");
            response.end();
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});