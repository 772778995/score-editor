const path = require('path');
const root = path.normalize(__dirname + '/abc/');
const http = require('http');
const fs = require('fs');
const mime = require('mime');
const port = 8080;

http.createServer((req, res) => {
    // console.log(req);
    const url_p = req.url.split('?');
    // console.log(url_p);
    const filename = path.join(root, decodeURI(url_p[0])); 
    // console.log(filename);
    // 获取请求的文件名，加上根目录得到完整的文件路径  
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end('Not Found');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', mime.getType(filename)); 
            // 设置Content-Type响应头      
            res.end(data);
        }
    });
}).listen(port);

console.log(`Server running at http://localhost:${port}/editor.html`);