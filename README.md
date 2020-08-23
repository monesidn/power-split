# Power Split
Because sometimes `String.split()` it's not enough!

This is a small Typescript library that I've wrote out of frustration building a command line parser from scratch. It provides a few utility methods that solves some use case that a bare call to `String.split()` won't solve.

## What it can do?
1. Split a string using a regex, pretty obvious! See `PowerSplit.split()`
1. Split a string using a regex providing data about start and end of each element See `PowerSplit.splitWithIndexes()`
1. Return a portion of the string between two tokens. See `PowerSplit.substring()`
1. Split a string in half at a specific token. See `PowerSplit.cutAt()`

That's all (currently). Maybe it's not much but solves some pretty tedious use cases. See the Example.

## How to use it
The library is written with typescript and provides it's own typings out-of-the-box. To start using it you just need to install it using:

```
npm install --save power-split
```

Now import the `PowerSplit` class and you're ready!
```typescript
import { PowerSplit } from 'power-split';
```

## Documentation
The code is documented using tsdoc so any compatible IDE should display it. Additionally you can find the documentation on the repository-connected github pages at: 

https://monesidn.github.io/power-split/

## Examples
All the following example are available under the examples folder and can be run using `ts-node`.

### Parsing getting tokens start and end indexes.
[examples/get-start-end-indexes.ts](examples/get-start-end-indexes.ts)
```typescript
import { PowerSplit } from '../src';

const input = `Lorem ipsum dolor \tsit    amet`;

// Here we want to split the string by spaces but also we need the start of each
// word. Using split whould successfully parse words into an array loosing index
// information.
console.log(JSON.stringify(input.split(/\s+/gu))); // ["Lorem", "ipsum", "dolor", "sit", "amet"]

// PowerParser to the rescue
console.log(JSON.stringify(PowerSplit.splitWithIndexes(input, /\s+/g), null, ' '));
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
[examples/parse-getting-remainder.ts](examples/parse-getting-remainder.ts)
```typescript
import { LimitMode, PowerSplit } from '../src';

const input = `Lorem ipsum dolor \tsit    amet`;

// Here we want to split the string into two chunks but also we want to get what is
// left of it. With split it won't work as people from other languages expect.
console.log(JSON.stringify(input.split(/\s+/, 2))); // ["Lorem", "ipsum"]

// With power parser we can use two approches:
// LimitMode.REMAINDER_AS_LAST
console.log(JSON.stringify(PowerSplit.splitWithIndexes(input, /\s+/g, 3, LimitMode.REMAINDER_AS_LAST), null, ' '));
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
const powerSplit2 = PowerSplit.splitWithIndexes(input, /\s+/g, 2);
console.log(JSON.stringify(powerSplit2, null, ' '));
console.log(JSON.stringify(input.substring(powerSplit2[1].end)));
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