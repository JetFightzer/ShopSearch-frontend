


export interface ProductFields {
	readonly name: string;
	readonly price: number;
	readonly size: 'S' | 'M' | 'L';
	readonly color: ('light' | 'medium' | 'dark')[];
	readonly cells: number;
	readonly amountInPack: number;
}


export class Product {
	constructor(public fields: ProductFields) {

	}
}

let waffle = new Product({
	name:  'waffle',
	price:  2999,
	size:  'M',
	color: ['medium'],
	cells:  4*4,
	amountInPack: 1,
});