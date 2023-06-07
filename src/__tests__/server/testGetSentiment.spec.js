const { getSentiment } = require('../../server/api.js');

describe('Test getSentiment', () => {
    it('Should be defined', () => {
        expect(getSentiment).toBeDefined();
    });
})