import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import env from '../../config/env'
import { verifyToken } from '../../utils/token'
import { WEBSOCKET_EVENTS } from './socket-events'

type SocketMiddleware = (socket: Socket, next: Function) => void

/**
 * Service that handles incoming socket
 * connections using socket.io.
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
                origin: '*',
            },
        })
        this.middleware.forEach((m) => this.server.use(m))
        this.server.on('connection', this.getConnectionHandler())
    }

    /**
     * Emits an event through a websocket
     * connection to a given room
     */
    emitEventToRoom<TWsEvent extends keyof WEBSOCKET_EVENTS>(
        emitEvent: TWsEvent,
        data: WEBSOCKET_EVENTS[TWsEvent],
        roomId: number
    ) {
        this.server.to(`${roomId}`).emit(emitEvent, data)
    }

    /**
     * Returns the handler used for all connections
     */
    getConnectionHandler() {
        return (socket: Socket) => {
            if (env.NODE_ENV !== 'production') {
                console.log('=================================');
                console.log('Se ha conectado un usuario...', socket.id);
                console.log('=================================');
            }
        }
    }

    /**
     * Registers middleware to use for the socket
     * server
     *
     * @param {SocketMiddleware} middleware
     */
    async useMiddleware(middleware: SocketMiddleware) {
        this.middleware.push(middleware);
    }
}

export class SocketWithAuthenticationService extends SocketService {
    constructor() {
        super()
        this.useMiddleware((socket, next) =>
            this.verifyAuthSocket(socket, next)
        )
    }

    async verifyAuthSocket(socket: Socket, next: Function) {
        const token = socket.handshake.auth.authorization;
        if (!token) return socket.disconnect();
        try {
            const { id: userId } = await verifyToken<{ id: number }>(token)
            socket.data.userId = userId
            socket.join(`${userId}`)
        } catch (err) {
            return socket.disconnect()
        }

        next()
    }
}

export const socketService = new SocketWithAuthenticationService()
