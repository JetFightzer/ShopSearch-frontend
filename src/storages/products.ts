import { IObservableArray, observable, trace } from "mobx";
import { Product, ProductFields } from "models/Product";



const products: IObservableArray<Product> = observable.array([]);
trace(products);

global.products = products;

export default products;