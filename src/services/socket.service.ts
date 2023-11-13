import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { UserService } from './user.service'

type SocketMiddleware = (socket: Socket, next: Function) => void

/**
 * Service that handles incoming socket
 * connections using socket.io.
 * Exposes an interface to send real-time
 * notifications to clients
 */
export class SocketService {
    server: Server
    middleware: SocketMiddleware[] = [];

    /**
     *
     * @param usersService
     * @param httpServer
     */
    constructor(
        private httpServer: HttpServer
    ) {
        this.server = new Server(httpServer, {
            cors: {
                origin: '*',
            },
        })
    }

    /**
     * Starts listening for connections
     */
    async run() {
        this.middleware.forEach((m) => this.server.use(m))
        this.server.on('connection', this.getConnectionHandler());
    }

    /**
     * Returns the handler used for connections
     */
    getConnectionHandler() {
        return (socket: Socket) => {
            console.log('Se ha conectado un usuario...', socket.id);
        }
    }

    /**
     * Registers middleware to use for the socket
     * server
     *
     * @param middleware
     */
    async useMiddleware(middleware: SocketMiddleware) {
        this.middleware.push(middleware)
    }
}

export function socketServerFrom(httpServer: HttpServer) {
    return new SocketService(httpServer);
}