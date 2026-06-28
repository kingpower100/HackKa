const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 3000);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(root, normalized);

  if (!filePath.startsWith(root)) {
    return null;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(root, 'index.html');
  }

  return filePath;
}

http
  .createServer((req, res) => {
    const filePath = resolveFile(req.url || '/');
    if (!filePath || !fs.existsSync(filePath)) {
      send(res, 404, 'Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    fs.createReadStream(filePath)
      .on('error', () => send(res, 500, 'Server error'))
      .pipe(res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' }));
  })
  .listen(port, () => {
    console.log(`HackKa is running at http://localhost:${port}`);
  });
