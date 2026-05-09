import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { initMailer } from "./src/services/mail.service.js";
import http from "http";
import { initSocketServer } from "./src/sockets/server.socket.js";

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        await initMailer()
        const httpServer = http.createServer(app);
        await initSocketServer(httpServer);
        const port = process.env.PORT || 3000;
        httpServer.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();