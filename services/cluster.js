import cluster from 'cluster';
import os from "os";

if (cluster) {
    const numCPUs = os.cpus().length;

    console.log(`Master ${process.pid} is running`);

    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle worker process exit, create a new worker
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Worker processes run your app logic here
    console.log(`Worker ${process.pid} started`);

    // Replace this with your actual application logic
    // For example, starting your HTTP server
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello, world!');
    });
    server.listen(3000);
}
