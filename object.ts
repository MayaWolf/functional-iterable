import {F as SyncF} from './sync';

export class ObjectF<T> {
	constructor(private readonly value: T) {
	}

	entries(): SyncF<[keyof T, T[keyof T]]> {
		return new SyncF((function* (value: T) {
			for(const key in value)
				yield [key, value[key]] as [keyof T, T[keyof T]];
		})(this.value));
	}

	keys(): SyncF<keyof T> {
		if(Array.isArray(this.value)) return new SyncF(this.value.keys()) as SyncF<keyof T>;
		return new SyncF((function* (value: T) {
			for(const key in value)
				yield key;
		})(this.value));
	}

	toMap(): Map<keyof T, T[keyof T]> {
		const map = new Map();
		for(const key in this.value)
			map.set(key, this.value[key]);
		return map;
	}

	values(): SyncF<T[keyof T]> {
		return new SyncF((function* (value: T) {
			for(const key in value)
				yield value[key];
		})(this.value));
	}
}

export default function f<T>(object: T): ObjectF<T> {
	return new ObjectF<T>(object);
}
