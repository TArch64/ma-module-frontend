const JSDOMEnvironment = require('jest-environment-jsdom');

module.exports = class extends JSDOMEnvironment {
    async setup() {
        await super.setup();
        const { TextEncoder, TextDecoder } = require('util');

        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
    }
}
