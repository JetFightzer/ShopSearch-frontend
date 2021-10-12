


export const possibleProductOptions = {
	name: [],
	price: [],
	size: ['2x2', '3x3', '4x4', '5x4', '5x5'],
	color: ['light', 'medium', 'dark'],
	amountInPack: [],
} as const;

export interface ProductFields {
	readonly id: number,
	readonly name: string;
	readonly price: number;
	readonly size: typeof possibleProductOptions.size[number];
	readonly color: typeof possibleProductOptions.color[number][];
	readonly amountInPack: number;
}


export class Product {
	constructor(public fields: ProductFields) {

	}
}
