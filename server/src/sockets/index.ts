import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';


class AppSocket {
    private readonly io: SocketServer;

    constructor(server: HttpServer) {
        const options = {
            cors: {
                origin: process.env.CLIENT_URL,
                credentials: true
            }
        };

        this.io = new SocketServer(server, options);

        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('chat message', (msg: string) => {
                console.log(`message: ${msg}`);
                this.io.emit('chat message', msg);
            });
        });
    }

    public getInstance(): SocketServer {
        return this.io;
    }
}

export default AppSocket;
