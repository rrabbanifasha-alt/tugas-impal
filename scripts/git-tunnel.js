const http = require('http');
const net = require('net');
const GITHUB_IPS = ['20.205.243.166', '140.82.112.4', '140.82.113.4'];

const server = http.createServer((req, res) => { res.writeHead(405); res.end(); });
server.on('connect', (req, clientSocket, head) => {
  const [host, port] = req.url.split(':');
  const targetHost = host === 'github.com' ? GITHUB_IPS[0] : host;
  const targetPort = parseInt(port || '443', 10);
  const serverSocket = net.connect(targetPort, targetHost, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
  serverSocket.on('error', () => clientSocket.destroy());
  clientSocket.on('error', () => serverSocket.destroy());
});
server.listen(19999, '127.0.0.1');
