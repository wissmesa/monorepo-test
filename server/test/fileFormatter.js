const assert = require('assert');
const FileFormatter2 = require('../utils/fileFormatter');

describe('FileFormatterCommonCases', () => {
    it('should return an empty array for an empty input array', async () => {
        const input = [];
        const result = await FileFormatter2.FileFormatter(input);
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
    it('should handle a file with no lines (only headers)', async () => {
        const input = [
            'file1,header1,header2'
        ];
        const expected = [
            {
                file: 'file1',
                lines: []
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });
    it('should format multiple files with multiple lines', async () => {
        const input = [
            'file1,header1,header2\nline1,1,2\nline2,3,4',
            'file2,header3,header4\nline3,5,6\nline4,7,8'
        ];
        const expected = [
            {
                file: 'file1',
                lines: [
                    { header1: '1', header2: '2' },
                    { header1: '3', header2: '4' }
                ]
            },
            {
                file: 'file2',
                lines: [
                    { header3: '5', header4: '6' },
                    { header3: '7', header4: '8' }
                ]
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });
    it('should format a single file with multiple lines', async () => {
        const input = [
            'file1,header1,header2\nline1,1,2\nline2,3,4'
        ];
        const expected = [
            {
                file: 'file1',
                lines: [
                    { header1: '1', header2: '2' },
                    { header1: '3', header2: '4' }
                ]
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });
    it('should validate a file with the correct format', async () => {
        const input = [
            {
                "file": "file1.csv",
                "lines": [
                    {
                        "text": "RgTya",
                        "number": 64075909,
                        "hex": "70ad29aacf0b690b0467fe2b2767f765"
                    }
                ]
            }]

        const expected = [
            {
                file: 'file1',
                lines: [
                    { header1: '1', header2: '2' },
                    { header1: '3', header2: '4' }
                ]
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });
});

describe('FileFormatter', () => {

    it('should handle a file with no headers (only lines)', async () => {
        const input = [
            'line1,1,2\nline2,3,4'
        ];
        const expected = [
            {
                file: '',
                lines: [
                    { '': '1', '': '2' },
                    { '': '3', '': '4' }
                ]
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });

    it('should handle a file with invalid line format (e.g. missing comma)', async () => {
        const input = [
            'file1,header1,header2\nline1 1 2\nline2,3,4'
        ];
        const expected = [
            {
                file: 'file1',
                lines: [
                    {
                        header1: '1 2',
                        header2: undefined
                    },
                    { header1: '3', header2: '4' }
                ]
            }
        ];
        const result = await FileFormatter2.FileFormatter(input);
        assert.deepEqual(result, expected);
    });

});