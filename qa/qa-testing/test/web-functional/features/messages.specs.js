const {sendMessage} = require('../CommunicationService');

describe('Messages List tab', () => {

    describe('received messages', () => {
        const body = require('../getBaseElement')('body');

        beforeEach(() => {
            browser.waitForExist('=Message List', 2000);
            browser.click('=Message List');
        });
        it('should show received message', () => {
            sendMessage({body: 'here is the body!!!!'});
            body().waitForExist('div*=here is the body!!!!', 2000);
        });
    });
});