import { action, extendObservable, toJS, autorun, trace, observable, ObservableSet } from 'mobx';
import localforage from 'localforage';

import { possibleProductOptions, Product, ProductFields } from 'models/Product';



// k in keyof ProductFields]: ProductFields[k] extends Array<infer T> ? ProductFields[k] : ProductFields[k][]

export class MultiFilter<T extends keyof ProductFields> {
	name: keyof ProductFields;
	options: Set<typeof possibleProductOptions[T][number]>;
	@observable selected: Set<typeof possibleProductOptions[T][number]> = new Set();

	constructor(name: T) {
		this.name = name;
		this.options = new Set([...possibleProductOptions[name]]);

		trace(this.selected);
	}

	applyTo = (product: Product) => {
		return [...this.options].some(option => product.fields[this.name] === option);
	};

	@action
	select = (option: typeof possibleProductOptions[T][number]) => {
		this.selected.add(option);
	};

	@action
	deselect = (option: typeof possibleProductOptions[T][number]) => {
		this.selected.delete(option);
	};

	@action
	setSelected = (options: Set<typeof possibleProductOptions[T][number]>) => {
		this.selected = observable.set(options);
	};

	@action
	toggle = (option: typeof possibleProductOptions[T][number], checked: boolean) => {
		if(this.selected.has(option)) this.deselect(option); else this.select(option);
	};
}

export class RadioFilter<T extends keyof ProductFields> {
	name: keyof ProductFields;
	options: Set<typeof possibleProductOptions[T][number]>;
	@observable selected: typeof possibleProductOptions[T][number] | null = null;

	constructor(name: T) {
		this.name = name;
		this.options = new Set([...possibleProductOptions[name]]);
	}

	applyTo = (product: Product) => {
		return product.fields[this.name] === this.selected;
	}

	@action
	select = (option: typeof possibleProductOptions[T][number]) => {
		return this.selected = option;
	};

	@action
	deselect = (option: typeof possibleProductOptions[T][number]) => {
		return this.selected = null;
	};
}

export class TextFilter<T extends keyof ProductFields> {
	name: keyof ProductFields;
	@observable text: string = '';

	constructor(name: T) {
		this.name = name;
	}

	applyTo = (product: Product) => {
		return this.text ? product.fields[this.name].toString().includes(this.text) : true;
	}

	@action
	set = (text: string) => {
		this.text = text;
	}
}


export class RangeFilter<T extends keyof ProductFields> {
	name: keyof ProductFields;
	step?: number;
	@observable min: number = 0;
	@observable max: number = 100;
	@observable selectedMin: number;
	@observable selectedMax: number;

	constructor(name: T, min: number = 0, max: number = 100, step?: number) {
		// extendObservable(this, { min: min, max: max });

		this.name = name;
		this.step = step;
		this.min = min;
		this.max = max;
		this.selectedMin = min;
		this.selectedMax = max;

	}

	applyTo = (product: Product) => {
		const tested = typeof product.fields[this.name] === 'number' ? product.fields[this.name] : null;
		const min = tested !== null ? product.fields[this.name] >= this.selectedMin : true;
		const max = tested !== null ? product.fields[this.name] <= this.selectedMax : true;
		return min && max;
	}

	@action
	setMin = (value: number) => {
		this.selectedMin = Math.min(Math.max(value, this.min), this.selectedMax );
	}

	@action
	setMax = (value: number) => {
		this.selectedMax = Math.max(Math.min(value, this.max), this.selectedMin);
	}
}

export type AnyFilter = TextFilter<keyof ProductFields> | RangeFilter<keyof ProductFields> | RadioFilter<keyof ProductFields> | MultiFilter<keyof ProductFields>;

const filters = {
	search: observable.box(''),
	name:  new TextFilter('name'),
	price: new RangeFilter('price', 1, 400, 1),
	size:  new MultiFilter('size'),
	color: new MultiFilter('color'),
	amountInPack: new RangeFilter('amountInPack', 1, 20, 1),
};

global.filters = filters;

export default filters;