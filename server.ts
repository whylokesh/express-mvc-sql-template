import cluster from "node:cluster";
import os from "node:os";
import app from "./app";

const PORT = process.env.PORT || 5000;
const numCPUs = os.cpus().length; // Get the number of CPU cores

if (cluster.isPrimary) {
  console.log(`🟢 Primary process ${process.pid} is running`);

  // Fork worker processes equal to the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart a worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    console.error(`❌ Worker ${worker.process.pid} crashed. Restarting...`);
    cluster.fork();
  });
} else {
  // Worker processes handle requests
  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
  });
}
