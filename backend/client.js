const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8081');

ws.on('open', function open() {
    const data = {
        'sender':'A',
        'body':'body'
    };
  ws.send(JSON.stringify(data));
});

ws.on('message', function incoming(message) {
  console.log('received: %s', message);
});