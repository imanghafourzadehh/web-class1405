import { createServer } from "http";
function serverCallBack() {
    console.log ("hi this is a test")
}
let server = createServer(serverCallBack)
server.listen(1024);
