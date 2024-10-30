import { SerialPort } from 'serialport';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const ws_port = process.env.WS_PORT || 25680;
const baudRate = parseInt(process.env.BAUDRATE, 10) || 9600;

const wss = new WebSocketServer({ port: ws_port });



wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log('Received from Scratch:', message);

        const parsedMessage = JSON.parse(message);
        if (parsedMessage.action === 'scanPorts') {
            SerialPort.list().then(ports => {
                const portNames = ports.map(port => port.path);
                ws.send(JSON.stringify({ action: 'portsList', ports: portNames }));
            }).catch(err => {
                console.error('Error listing ports:', err);
                ws.send(JSON.stringify({ action: 'error', message: err.message }));
            });
        } else if (parsedMessage.action === 'connectPort') {
            const portName = parsedMessage.port;
            const serialPort = new SerialPort({ path: portName, baudRate });

            serialPort.on('open', () => {
                console.log(`Connected to port: ${portName}`);
                ws.send(JSON.stringify({ action: 'connected', port: portName }));
            });

            serialPort.on('data', (data) => {
                console.log(`Data from ${portName}:`, data.toString());
                ws.send(JSON.stringify({ action: 'serialData', data: data.toString() }));
            });

            serialPort.on('error', (err) => {
                console.error(`Error on port ${portName}:`, err.message);
                ws.send(JSON.stringify({ action: 'error', message: err.message }));
            });

            ws.on('message', (msg) => {
                const command = JSON.parse(msg);
                if (command.action === 'writeData') {
                    serialPort.write(command.data, (err) => {
                        if (err) {
                            console.error('Error writing to port:', err.message);
                            ws.send(JSON.stringify({ action: 'error', message: err.message }));
                        }
                    });
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

console.log(`baudRate: ${baudRate}`);
console.log(`WebSocket server listening on ws://localhost:${ws_port}`);

