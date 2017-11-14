import {addNodes} from "../../CommunicationService";

describe('Node List load tests', () => {
    const body = require('../../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });

    it('should be able to handle 1000 nodes quickly', () => {
        addNodes(1000);
        const start = new Date().getTime();
        body().waitUntil(() =>  body().elements('circle').value.length === 1000, 5000);
        expect(new Date().getTime() - start).to.be.at.most(4000);
    });
});