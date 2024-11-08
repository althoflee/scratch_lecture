const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

class Scratch3SerialCommBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this.ws = null;
        this.latestSerialData = '';
        this.portList = [];
        this.connectWebSocket();
    }

    getInfo() {
        return {
            id: 'serialComm',
            name: 'Serial Communication',
            blocks: [
                {
                    opcode: 'scanPorts',
                    blockType: BlockType.COMMAND,
                    text: 'scan serial ports',
                },
                {
                    opcode: 'connectPort',
                    blockType: BlockType.COMMAND,
                    text: 'connect to port [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'COM3'
                        }
                    }
                },
                {
                    opcode: 'writeData',
                    blockType: BlockType.COMMAND,
                    text: 'write [DATA] to serial',
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello'
                        }
                    }
                },
                {
                    opcode: 'onSerialData',
                    blockType: BlockType.REPORTER,
                    text: 'received serial data'
                },
                {
                    opcode: 'getPortList',
                    blockType: BlockType.REPORTER,
                    text: 'available ports list'
                },
                {
                    opcode: 'getPortCount',
                    blockType: BlockType.REPORTER,
                    text: 'total number of ports'
                },
                {
                    opcode: 'getPortByIndex',
                    blockType: BlockType.REPORTER,
                    text: 'port at index [INDEX]',
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
            ]
        };
    }

    connectWebSocket() {
        this.ws = new WebSocket('ws://localhost:25680');
        this.ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        this.ws.onmessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            if (parsedMessage.action === 'serialData') {
                this.latestSerialData = parsedMessage.data;
            } else if (parsedMessage.action === 'portsList') {
                this.portList = parsedMessage.ports;
                this.latestSerialData = this.portList.join(', ');
            }
        };
        this.ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    scanPorts(args) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ action: 'scanPorts' }));
        }
    }

    connectPort(args) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ action: 'connectPort', port: args.PORT }));
        }
    }

    writeData(args) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ action: 'writeData', data: args.DATA }));
        }
    }

    onSerialData() {
        return this.latestSerialData;
    }

    getPortList() {
        return this.portList;
    }

    getPortCount() {
        return this.portList.length;
    }

    getPortByIndex(args) {
        const index = args.INDEX;
        if (index >= 0 && index < this.portList.length) {
            return this.portList[index];
        }
        return '';
    }
}

module.exports = Scratch3SerialCommBlocks;
