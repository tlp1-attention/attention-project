import { Server as HttpServer } from "http";
import { Server } from 'socket.io';
import { UserService } from "./user.service";

/**
 * Service that handles incoming socket
 * connections using socket.io.
 * Exposes an interface to send real-time
 * notifications to clients 
 */
export class SocketService {
    server: Server;

    constructor(
        private usersService: UserService,
        private httpServer: HttpServer
    ) {
        this.server = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
    }

    /**
     * Starts listening for connections
     */
    async run() {
        this.server.on('connection', this.getConnectionHandler());
    }

    /**
     * 
     */

}