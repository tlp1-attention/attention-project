import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { UserService } from './user.service'
import { IndividualEvent } from './emitter/emit.interface'
import { AppEventsMap } from './emitter/app-events-map'
import { WEBSOCKET_EVENTS } from './socket/socket-events'

type SocketMiddleware = (socket: Socket, next: Function) => void

/**
 * Service that handles incoming socket
 * connections using socke.io.
 *
 * Exposes an interface to emit real-time
 * events to clients
 */
export class SocketService {
    server: Server
    middleware: SocketMiddleware[] = []

    /**
     * Constructor of the class.
     * We give the opportunity to lazy-load
     * the HttpServer
     * 
     * @param usersService
     * @param httpServer
     */
    constructor() {}

    /**
     * Starts listening for connections
     */
    async runOn(httpServer: HttpServer) {
        this.server = new Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        this.middleware.forEach((m) => this.server.use(m))
        this.server.on('connection', this.getConnectionHandler())
    }

    /**
     * Emits an event through a websocket
     * connection to a given room 
     */
    emitEvent<TWsEvent extends keyof WEBSOCKET_EVENTS>(
        emitEvent: TWsEvent,
        data: WEBSOCKET_EVENTS[TWsEvent],
        roomId: number
    ) {
        this.server.to(`${roomId}`).emit(
            emitEvent,
            data
        );
    }

    /**
     * Returns the handler used for connections
     */
    getConnectionHandler() {
        return (socket: Socket) => {
            console.log('Se ha conectado un usuario...', socket.id)
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

export class SocketWithAuthenticationService extends SocketService {
    constructor() {
        super();
    }
}

export const socketService = new SocketService();
