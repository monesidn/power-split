import { LimitMode } from './limit-mode';
import { TokenWithIndexes } from './token-with-indexes';

/**
 * Library entry point. Expose static methods for different operations.
 */
export class PowerSplit {
    /**
     * Performs a split using a regular expression returing tokens with index data.
     * @param {string} input  The string to work on.
     * @param {RegExp} re The regular expression to parse with.
     * @param {number} limit Maxium number of elements to return.
     * @param {LimitMode} limitMode How the limit argument should be applied.
     * @return {TokenWithIndexes[]} An array of tokens splitted from the input string. Each item
     * contains start and end indexes.
     */
    static splitWithIndexes(
        input: string,
        re: RegExp,
        limit?: number,
        limitMode = LimitMode.STOP_AT
    ): TokenWithIndexes[] {
        if (limit === 0)
            return [];

        const tokens: TokenWithIndexes[] = [];
        let remainderIndex = 0;
        for (const match of input.matchAll(re)) {
            const token = input.substring(remainderIndex, match.index);
            const obj: TokenWithIndexes = {
                start: remainderIndex,
                end: remainderIndex + token.length,
                token,
                originalString: input
            };

            tokens.push(obj);

            if (tokens.length === limit) {
                if (limitMode === LimitMode.REMAINDER_AS_LAST) {
                    // We override the last item.
                    obj.end = input.length;
                    obj.token = input.substring(remainderIndex);
                }
                return tokens;
            }
            remainderIndex = obj.end + match[0].length;
        }

        const remainder = input.substring(remainderIndex);
        tokens.push({
            start: remainderIndex,
            end: input.length,
            token: remainder,
            originalString: input
        });

        return tokens;
    }

    /**
     * Like calling `splitWithIndexes()` but returns raw tokens instead of objects.
     * @param {string} input  The string to work on.
     * @param {RegExp} re The regular expression to parse with.
     * @param {number} limit Maxium number of elements to return.
     * @param {LimitMode} limitMode How the limit argument should be applied.
     * @return {string[]} The parsed tokens.
     */
    static split(
        input: string,
        re: RegExp,
        limit?: number,
        limitMode = LimitMode.STOP_AT
    ): string[] {
        return this.splitWithIndexes(input, re, limit, limitMode).map((i) => i.token);
    }
}
