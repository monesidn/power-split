
/**
 * A single token obtained by splitting a string.
 */
export interface TokenWithIndexes {
    /**
     * Token text content
     */
    token: string;

    /**
     * Where the token starts in the original string.
     */
    start: number;

    /**
     * Where the token ends in the original string.
     */
    end: number;

    /**
     * The original string this token was extracted from.
     */
    originalString: string;
}
