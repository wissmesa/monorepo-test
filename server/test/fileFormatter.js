const assert = require('assert');
const FileFormatter = require('../utils/fileFormatter');

describe('FileFormatterCommonCases', () => {
    it('should return an empty array for an empty input array', async () => {
        const input = [];
        const result = await FileFormatter.FileFormatter(input);
        assert.deepEqual(result, []);
    });
    it('should handle error (e.g. invalid input type)', async () => {
        const input = ' invalid input ';
        try {
            await FileFormatter(input);
            assert.fail('Expected error to be thrown');
        } catch (error) {
            assert.ok(error);
        }
    });

    it('should format valid input data', async () => {
        const arrayWithFilesNotFormatted = [
            'file,text,number,hex\n' +
            'test1.csv,hello,123,abc\n' +
            'test1.csv,world,456,def',
            'file,text,number,hex\n' +
            'test2.csv,foo,789,ghi\n' +
            'test2.csv,bar,012,jkl'
        ];
        const nameFiles = ['test1.csv', 'test2.csv'];
        const expectedOutput = [
            {
                file: 'test1.csv',
                lines: [
                    { text: 'hello', number: '123', hex: 'abc' },
                    { text: 'world', number: '456', hex: 'def' }
                ]
            },
            {
                file: 'test2.csv',
                lines: [
                    { text: 'foo', number: '789', hex: 'ghi' },
                    { text: 'bar', number: '012', hex: 'jkl' }
                ]
            }
        ];
        const result = await FileFormatter.FileFormatter(arrayWithFilesNotFormatted, nameFiles);
        assert.deepStrictEqual(result, expectedOutput);
    });
    it('should handle empty input data', async () => {
        const arrayWithFilesNotFormatted = [];
        const nameFiles = [];
        const expectedOutput = [];
        const result = await FileFormatter.FileFormatter(arrayWithFilesNotFormatted, nameFiles);
        assert.deepStrictEqual(result, expectedOutput);
    });
    it('should handle incomplete lines', async () => {
        const arrayWithFilesNotFormatted = [
            'file,text,number,hex\n' +
            'test1.csv,hello,123\n' +
            'test1.csv,world,456,def'
        ];
        const nameFiles = ['test1.csv'];
        const expectedOutput = [
            {
                file: 'test1.csv',
                lines: [
                    { text: 'world', number: '456', hex: 'def' }
                ]
            }
        ];
        const result = await FileFormatter.FileFormatter(arrayWithFilesNotFormatted, nameFiles);
        assert.deepStrictEqual(result, expectedOutput);
    });
    it('should handle multiple files', async () => {
        const arrayWithFilesNotFormatted = [
            'file,text,number,hex\n' +
            'test1.csv,hello,123,abc\n' +
            'test1.csv,world,456,def',
            'file,text,number,hex\n' +
            'test2.csv,foo,789,ghi\n' +
            'test2.csv,bar,012,jkl',
            'file,text,number,hex\n' +
            'test3.csv,baz,345,mno\n' +
            'test3.csv,qux,901,pqr'
        ];
        const nameFiles = ['test1.csv', 'test2.csv', 'test3.csv'];
        const expectedOutput = [
            {
                file: 'test1.csv',
                lines: [
                    { text: 'hello', number: '123', hex: 'abc' },
                    { text: 'world', number: '456', hex: 'def' }
                ]
            },
            {
                file: 'test2.csv',
                lines: [
                    { text: 'foo', number: '789', hex: 'ghi' },
                    { text: 'bar', number: '012', hex: 'jkl' }
                ]
            },
            {
                file: 'test3.csv',
                lines: [
                    { text: 'baz', number: '345', hex: 'mno' },
                    { text: 'qux', number: '901', hex: 'pqr' }
                ]
            }
        ];
        const result = await FileFormatter.FileFormatter(arrayWithFilesNotFormatted, nameFiles);
        assert.deepStrictEqual(result, expectedOutput);
    });

});