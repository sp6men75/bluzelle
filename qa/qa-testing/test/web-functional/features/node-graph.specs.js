const _ = require('lodash');
import {addNode, updateNode, removeNode} from "../CommunicationService";

describe('Node graph tab', () => {
    require('../getBaseElement')('body');

    beforeEach(() => {
        browser.waitForExist('=Node Graph', 2000);
        browser.click('=Node Graph');
    });

    describe('individual nodes', () => {
        _.each({green: 'alive', red: 'dead', blue: 'new'}, (state, color) => {
            it(`should display specs when mouseover on ${color} node`, () => {
                const nodeInfo = addNode({nodeState: state});
                updateNode(nodeInfo.address, {nodeState: state});
                checkInfoTable(nodeInfo.address, state);
                checkInfoTable(nodeInfo.address, nodeInfo.address);
            });
        });
    });

    describe('remove node', () => {
        it('@watch should remove a node when a removeNodes command is received', () => {
            expect(browser.isExisting('circle')).to.be.false;
            const node = addNode();
            browser.waitForExist('circle');
            removeNode(node.address);
            browser.waitForExist('circle', 5000, true);
        })
    })
});

const checkInfoTable = (address, value) => {
    browser.waitForExist(`g#node-${address}`, 2000);
    browser.moveToObject(`g#node-${address}`);
    browser.waitForExist(`td=${value}`, 2000);
};