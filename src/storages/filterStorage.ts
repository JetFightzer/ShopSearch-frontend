import { action, extendObservable, toJS, autorun, trace, observable } from 'mobx';
import localforage from 'localforage';

import { ProductFields } from 'models/Product';


export type FilterState = {
	[k in keyof ProductFields]: ProductFields[k] extends Array<infer T> ? ProductFields[k] : ProductFields[k][]
}

class FilterStorage {
	@observable filters: FilterState;

	constructor(filters: FilterState) {
		this.filters = filters;
	}
}



const filterStorage = new FilterStorage({
	name:  ['waffle'],
	price:  [2999],
	size:  ['M'],
	color: ['medium', 'dark'],
	cells:  [4*4],
	amountInPack: [1],
});

global.filterStorage = filterStorage;

export default filterStorage;