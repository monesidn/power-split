
/**
 * When using String.split() the `limit` argument make processing stop after
 * extracting n tokens, where n = `limit`. Other languages store, in the nth
 * token, the remainder of the string. The latter mode may be often useful
 * so this library let you choose which behaviour the limit argument will
 * provide.
 */
export enum LimitMode {
    /**
     * The tokenization will stop after hitting the limit result count.
     */
    STOP_AT='STOP_AT',

    /**
     * The tokenization will stop after hitting the limit result count and
     * the last element will hold the unprocessed part of the input string.
     */
    REMAINDER_AS_LAST='REMAINDER_AS_LAST'
}
