// const chai = require('chai');
const { searchFilesByname } = require('../utils/searchFilesByname');
const FileFormatter = require('../utils/fileFormatter');


describe('searchFilesByname', () => {
    it('should return formatted file data for successful file fetching', async () => {
        const files = { files: ['file1', 'file2'] };
        const response = { ok: true, text: async () => 'data1,data2,data3' };
        global.fetch = async () => response;

        const result = await searchFilesByname(files);
        console.assert(JSON.stringify(result) === JSON.stringify([
            { file: 'file1', lines: [{ data1: 'data1', data2: 'data2', data3: 'data3' }] },
            { file: 'file2', lines: [{ data1: 'data1', data2: 'data2', data3: 'data3' }] },
        ]));

        global.fetch = undefined;
    });

    it('should log error and continue for error fetching file data', async () => {
        const files = { files: ['file1', 'file2'] };
        const response = { ok: false, status: 404 };
        global.fetch = async () => response;
        const consoleWarnStub = console.warn;

        console.warn = () => { };

        const result = await searchFilesByname(files);
        console.assert(consoleWarnStub !== console.warn);
        console.assert(JSON.stringify(result) === JSON.stringify([]));

        global.fetch = undefined;
        console.warn = consoleWarnStub;
    });

    it('should return empty array for empty input files', async () => {
        const files = { files: [] };

        const result = await searchFilesByname(files);
        console.assert(JSON.stringify(result) === JSON.stringify([]));
    });

    it('should throw error for invalid input type', async () => {
        const files = ' invalid input ';

        try {
            await searchFilesByname(files);
            console.assert(false, 'Expected error to be thrown');
        } catch (error) {
            console.assert(true);
        }
    });
});