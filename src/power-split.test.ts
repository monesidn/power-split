import { LimitMode } from './limit-mode';
import { PowerSplit } from './power-split';
import { TokenWithIndexes } from './token-with-indexes';


// eslint-disable-next-line valid-jsdoc
/**
 * Utility function to check if the split returned the right indexes.
 */
function verifyTokenWithIndexesResult(originalString: string, result: TokenWithIndexes[], expectedIndexes: number[][]) {
    expect(result).toHaveLength(expectedIndexes.length);

    for (let i = 0; i < expectedIndexes.length; i++) {
        const [expStart, expEnd] = expectedIndexes[i];
        const { start, end, token } = result[i];
        const expToken = originalString.substring(expStart, expEnd);

        expect(start).toBe(expStart);
        expect(end).toBe(expEnd);
        expect(token).toBe(expToken);
    }
}

describe('Splitting with indexes', () => {
    test('Simple regex, regular spaces.', async () => {
        const input = `Lorem ipsum dolor sit amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s/g);
        verifyTokenWithIndexesResult(input, result, [
            [0, 5], [6, 11], [12, 17], [18, 21], [22, 26]
        ]);
    });

    test('Variable length regex, regular spaces.', async () => {
        const input = `Lorem ipsum dolor sit amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g);
        verifyTokenWithIndexesResult(input, result, [
            [0, 5], [6, 11], [12, 17], [18, 21], [22, 26]
        ]);
    });

    test('Variable length regex, mixed spaces.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g);
        console.debug(result);

        verifyTokenWithIndexesResult(input, result, [
            [0, 5], [6, 11], [12, 17], [19, 22], [26, 30]
        ]);
    });

    test('Variable length regex, mixed spaces, limit with default handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 2);

        verifyTokenWithIndexesResult(input, result, [
            [0, 5], [6, 11]
        ]);
    });

    test('Variable length regex, mixed spaces, limit with remainder handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 2, LimitMode.REMAINDER_AS_LAST);

        verifyTokenWithIndexesResult(input, result, [
            [0, 5], [6, 30]
        ]);
    });

    test('Limit = 0, default handling', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 0);

        expect(result).toHaveLength(0);
    });

    test('Limit = 0, remainder handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 0, LimitMode.REMAINDER_AS_LAST);

        expect(result).toHaveLength(0);
    });

    test('Limit = 1, default handling', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 1);

        verifyTokenWithIndexesResult(input, result, [
            [0, 5]
        ]);
    });

    test('Limit = 1, remainder handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const result = PowerSplit.splitWithIndexes(input, /\s+/g, 1, LimitMode.REMAINDER_AS_LAST);

        verifyTokenWithIndexesResult(input, result, [
            [0, 30]
        ]);
    });
});

describe('Splitting returning tokens only', () => {
    test('Simple regex, regular spaces.', async () => {
        const input = `Lorem ipsum dolor sit amet`;
        const re = /\s/g;
        const result = PowerSplit.split(input, re);

        expect(result).toStrictEqual(input.split(re));
    });

    test('Variable length regex, regular spaces.', async () => {
        const input = `Lorem ipsum dolor sit amet`;
        const re = /\s+/g;
        const result = PowerSplit.split(input, re);

        expect(result).toStrictEqual(input.split(re));
    });

    test('Variable length regex, mixed spaces.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const re = /\s/g;
        const result = PowerSplit.split(input, re);

        expect(result).toStrictEqual(input.split(re));
    });

    test('Variable length regex, mixed spaces, limit with default handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const re = /\s/g;
        const result = PowerSplit.split(input, re, 2);

        expect(result).toStrictEqual(input.split(re, 2));
    });

    test('Variable length regex, mixed spaces, limit with remainder handling.', async () => {
        const input = `Lorem ipsum dolor \tsit    amet`;
        const re = /\s/g;
        const result = PowerSplit.split(input, re, 2, LimitMode.REMAINDER_AS_LAST);

        expect(result).toStrictEqual(['Lorem', 'ipsum dolor \tsit    amet']);
    });
});
