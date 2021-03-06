# functional-iterable
This package provides helper functions for interacting with `Iterable<T>`s and `AsyncIterable<T>`s.

It supports TypeScript and traditional JavaScript.

`yarn install functional-iterable`

## Usage
```typescript
import f, {fAsync} from 'functional-iterable';

function* generator() {
	for(const item of [1, 2, 3])
		yield item;
}

async function* asyncGenerator() {
	for(const item of [1, 2, 3])
		yield item;
}

f(generator()).map(x => x + 1).toArray(); //[2, 3, 4]
fAsync(asyncGenerator()).reduce((acc, x) => acc + x, 0) //Promise<6>
f([1, 2, 3]).all(x => x < 4); //true
```

## API
The exported function `f()` wraps an Iterable and offers helper methods on it. For all chainable functions, the returned value is also an Iterable usable in a `for ... of` loop or anywhere they might be used.

For `fAsync`, all methods return `Promise`s or `AsyncIterable`s and all callbacks may return `Promise`s (or `AsyncIterable` where applicable) for their respective values.
### `all(fn: (item: T) => boolean): boolean`
Returns true if all elements match the condition.

### `concat<U>(other: Iterable<U> | ...U): Iterable<T | U>`
Returns a new Iterable that iterates first over the entries in `this`, then over those of `other`.

### `count(fn?: (item: T) => boolean): number`
Counts the elements that match the given predicate, or the total count if none is given.

### `filter(fn?: (item: T) => boolean): Iterable<T>`
Returns a new Iterable that only contains entries that match the given predicate.

### `flatMap<U>(fn: (item: T) => Iterable<U> | undefined): Iterable<U>`
Returns a new Iterable containing any number of items for each element of the current one.

### `first(fn?: (item: T) => boolean): T | undefined`
Returns the first element to match the given callback, or the first element if none is given.

### `includes(item: T): boolean`
Returns whether the given element exists within the iterable.

### `map<U>(fn: (item: T) => U): Iterable<U>`
Returns a new Iterable with the entries of the current one modified by the given mapper function.

### `reduce<U>(fn: (current: U, item: T) => U, current: U): U`
Reduces the Iterable to a single value with a given accumulator function and starting value.

### `skip(count: number): Iterable<T>`
Returns a new Iterable that iterates over and discards the given number of elements, then continues executing normally.

### `some(fn: (item: T) => boolean): boolean`
Returns true if at least one element matches the condition.

### `take(count: number): Iterable<T>`
Returns a new Iterable that stops after returning at most the given number of elements.

### `toArray(): T[]`
Returns an array of all the entries in the Iterable.

### `toMap<U>(key: (item: T) => U): Map<U, T>`
Returns a Map of all the entries in the Iterable, keyed by the given key function.

### `toSet(): Set<T>`
Returns a Set of all the entries in the Iterable.

### `unique<U>(fn?: (item: T) => U): Iterable<T>`
Makes sure the value selected by the function only exists once. If no function is given, the entries themselves are made unique.

## Working with Objects
To conveniently iterate over an object, import `fObj` which returns a wrapper with the following methods.

### `entries(): Iterable<[keyof T, T[keyof T]]>`
Returns an Iterable where each element is a tuple containing key and value.

### `keys(): Iterable<keyof T>`
Returns an Iterable of the object's keys.

### `toMap(): Map<keyof T, T[keyof T]>`
Creates a Map of the object's keys and values.

### `values(): Iterable<T[keyof T]>`
Returns an Iterable of the object's values.

## Helpers

Helper functions are provided as properties of `f` to allow for easy creation of `Iterable`s.

### `f.range(from: number, to: number): Iterable<number>`
Returns an Iterable that includes all the numbers in the (inclusive) range defined by the two given numbers.

### `f.while<T>(fn: () => T): Iterable<T>`
Returns an Iterable that calls the given function repeatedly and yields the result unless and until it is falsy.
