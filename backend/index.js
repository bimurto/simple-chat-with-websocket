const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8081});

const users = new Set();

const sendMessage = (message, socket) => {
    for (const user of users) {
        if (socket !== user.socket) {
            user.socket.send(JSON.stringify(message));
            console.log(`Sending data ${JSON.stringify(message)} to ${socket}`)
        }
    }
};

server.on('connection', (socket) => {
    console.log('New user connected!');

    const userRef = {
        socket: socket,
        lastActiveAt: Date.now(),
    };
    users.add(userRef);

    socket.on('message', (message) => {
        try {
            console.log(`Raw message ${message} from ${socket}`)
            const parsedMessage = JSON.parse(message);
            console.log(`parsed message ${parsedMessage}`)

            sendMessage(parsedMessage, socket);
        } catch (error) {
            console.error('Error parsing message!', error);
        }
    });

    socket.on('close', (code, reason) => {
        console.log(`User disconnected with code ${code} and reason ${reason}!`);
        users.delete(userRef);
    });
});

