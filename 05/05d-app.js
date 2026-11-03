import framework from './05b-framwork.js';
import { writeFile, readFile, unlink, rm, appendFile } from 'node:fs';

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

app.get('/minus', function (request, response) {
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
    response.write((a - b).toString());
    response.end();
});

app.get('/createFile', function (request, response) {
    let items = request.url.split("/");
    const name = items[2];
    const content = items.slice(3).join("/");  

    if (!name) {
        response.writeHead(400);
        response.write("file name is required");
        response.end();
        return;
    }

    writeFile(name, content, function (error) {
        if (error) {
            console.log('error', error);
            response.writeHead(500);
            response.write("createFile error: " + error.message);
            response.end();
            return;
        }
        console.log("createFile done");
        response.writeHead(200);
        response.write("createFile done");
        response.end();
    });
});
app.get('/readFile', function (request, response) {
    let items = request.url.split("/");
    const path = items[2];

    if (!path) {
        response.writeHead(400);
        response.write("file path is required");
        response.end();
        return;
    }

    readFile(path, function (error, body) {
        if (error) {
            response.writeHead(500);
            response.write("readFile error: " + error.message);
            response.end();
            return;
        }
        console.log("readFile done");
        response.writeHead(200);
        response.write(body);
        response.end();
    });
});

app.get('/deleteFile', function (request, response) {
    let items = request.url.split("/");
    const path = items[2];

    if (!path) {
        response.writeHead(400);
        response.write("file path is required");
        response.end();
        return;
    }

    unlink(path, function (error) {
        if (error) {
            response.writeHead(500);
            response.write("deleteFile error: " + error.message);
            response.end();
            return;
        }
        console.log("deleteFile done");
        response.writeHead(200);
        response.write("done");
        response.end();
    });
});


app.get('/rmdir', function (request, response) {
    let items = request.url.split("/");
    const path = items[2];

    if (!path) {
        response.writeHead(400);
        response.write("path is required");
        response.end();
        return;
    }

    rm(path, { recursive: true, force: true }, function (error) {
        if (error) {
            response.writeHead(500);
            response.write("Remove error: " + error.message);
            response.end();
            return;
        }
        console.log("Remove done");
        response.writeHead(200);
        response.write("done");
        response.end();
    });
});

app.get('/signup', function (request, response) {
    console.log('--inside signup ------req.data', request.data);

    if (!request.data || request.data.trim() === "") {
        response.writeHead(400);
        response.write("body is required (send JSON with -d)");
        response.end();
        return;
    }

    let parsed;
    try {
        parsed = JSON.parse(request.data);
    } catch (e) {
        response.writeHead(400);
        response.write("invalid JSON body");
        response.end();
        return;
    }

    const line = JSON.stringify(parsed) + '\n';

    appendFile('db.json', line, function (error) {
        if (error) {
            console.log('db error', error);
            response.writeHead(500);
            response.write("signup error: " + error.message);
            response.end();
            return;
        }
        console.log("signup done (appended)");
        response.writeHead(200);
        response.write("signup done");
        response.end();
    });
});


app.get('/users', function (request, response) {
    readFile('db.json', 'utf8', function (error, body) {
        if (error) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify([]));
            return;
        }
        const users = body
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
                try { return JSON.parse(line); }
                catch (e) { return null; }
            })
            .filter(u => u !== null);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(users));
    });
});

app.listen(port, function () {
    console.log('app listening on port:', port);
});