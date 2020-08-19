# Power Split
Because sometimes `String.split()` it's not enough!

This is a small Typescript library that I've wrote out of frustration building a command line parser from scratch. It provides a few utility methods that solves some use case that a bare call to `String.split()` won't solve.

## Examples
### Parsing getting tokens start and end indexes.
```typescript
    const input = `Lorem ipsum dolor \tsit    amet`;

    // Here we want to split the string by spaces but also we need the start of each
    // word. Using split whould successfully parse words into an array loosing index
    // information.
    const simpleSplit = input.split(/\s+/); // ["Lorem", "ipsum", "dolor", "sit", "amet"]

    // PowerParser to the rescue
    const powerSplit = PowerSplit.splitWithIndexes(input, /s+/);
    // [
    //   {
    //     start: 0,
    //     end: 5,
    //     token: 'Lorem',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 6,
    //     end: 11,
    //     token: 'ipsum',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 12,
    //     end: 17,
    //     token: 'dolor',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 19,
    //     end: 22,
    //     token: 'sit',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 26,
    //     end: 30,
    //     token: 'amet',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   }
    // ]
```

### Parsing with limit getting remainder
```typescript
    const input = `Lorem ipsum dolor \tsit    amet`;

    // Here we want to split the string into two chunks but also we want to get what is
    // left of it. With split it won't work as people from other languages expect.
    const simpleSplit = input.split(/\s+/, 2); // ["Lorem", "ipsum"]

    // With power parser we can use two approches: 
    // LimitMode.REMAINDER_AS_LAST
    const powerSplit1 = PowerSplit.splitWithIndexes(input, /s+/, 3, LimitMode.REMAINDER_AS_LAST);
    // [
    //   {
    //     start: 0,
    //     end: 5,
    //     token: 'Lorem',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 6,
    //     end: 11,
    //     token: 'ipsum',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 12,
    //     end: 30,
    //     token: 'dolor \tsit    amet',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   }
    // ]

    // or in a more "manual" approach we can use the last index.
    const powerSplit2 = PowerSplit.splitWithIndexes(input, /s+/, 2);
    const remainder = input.substring(powerSplit2[2].end);
    // [
    //   {
    //     start: 0,
    //     end: 5,
    //     token: 'Lorem',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    //   {
    //     start: 6,
    //     end: 11,
    //     token: 'ipsum',
    //     originalString: 'Lorem ipsum dolor \tsit    amet'
    //   },
    // ]
    // "dolor \tsit    amet"
```