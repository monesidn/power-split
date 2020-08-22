import { LimitMode } from './limit-mode';
import { TokenWithIndexes } from './token-with-indexes';

/**
 * Library entry point. Expose static methods for different operations.
 */
export class PowerSplit {
    /**
     * Performs a split using a regular expression returing tokens with index data.
     * @param input -  The string to work on.
     * @param re - The regular expression to parse with.
     * @param limit - Maxium number of elements to return.
     * @param limitMode - How the limit argument should be applied.
     * @returns An array of tokens splitted from the input string. Each item
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

        if (!re.global) {
            throw new Error('PowerSplit require a regexp object with the "g" flag enabled!');
        }

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
     * @param input -  The string to work on.
     * @param re - The regular expression to parse with.
     * @param limit - Maxium number of elements to return.
     * @param limitMode - How the limit argument should be applied.
     * @returns The parsed tokens.
     */
    static split(
        input: string,
        re: RegExp,
        limit?: number,
        limitMode = LimitMode.STOP_AT
    ): string[] {
        return this.splitWithIndexes(input, re, limit, limitMode).map((i) => i.token);
    }

    /**
     * Returns a substring of the original string starting from token `start`.
     * If `end` is supplied then the substring ends after that token.
     * If `start` is `undefined` then `""` is returned,
     * If `end` is not given then the remaining string is returned.
     *
     * *This method (like others) assumes that start and end refer to the
     * same string. If it's not the case then unpredicatable results will occur.*
     * @param start - The token to start from (inclusive).
     * @param end - The token to stop at (inclusive). If not given
     * all the remaining string is returned.
     * @returns The original string section starting at the token at `index`
     */
    static substring(start: TokenWithIndexes, end?: TokenWithIndexes) {
        if (!start)
            return '';

        const str = start.originalString;
        const endIndex = end === undefined ? str.length : end.end;

        return str.substring(start.start, endIndex);
    }

    /**
     * Cut the original string into two parts: what's before and what's after the specified
     * token. You can specify where the token will be included.
     * @param cutPoint - The point where to cut the string.
     * @param tokenInAfter - If set to true (default) then the specified token is placed in
     * the "after" part.
     * @returns A two element array, the first element is the "before" part, the second
     * the "after".
     */
    static cutAt(cutPoint: TokenWithIndexes, tokenInAfter = true) {
        const str = cutPoint.originalString;
        const cutIndex = tokenInAfter ? cutPoint.start : cutPoint.end;

        return [
            str.substring(0, cutIndex),
            str.substring(cutIndex)
        ];
    }
}
