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
