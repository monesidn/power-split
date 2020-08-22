import { LimitMode, PowerSplit } from '../src';

const input = `Lorem ipsum dolor \tsit    amet`;

// Here we want to split the string into two chunks but also we want to get what is
// left of it. With split it won't work as people from other languages expect.
console.log(JSON.stringify(input.split(/\s+/, 2))); // ["Lorem", "ipsum"]

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
