const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');

class Scratch3HelloBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'hello',
            name: 'Hello',
            blocks: [
                {
                    opcode: 'sayHello',
                    blockType: BlockType.REPORTER,
                    text: 'say hello'
                }
            ]
        };
    }

    sayHello (args, util) {
        return 'hello';
    }
}

module.exports = Scratch3HelloBlocks;
