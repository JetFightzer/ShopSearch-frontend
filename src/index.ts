import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app/App';

import 'components/common/tailwind.css';
import filters from 'storages/filters';
import products from 'storages/products';
import { autorun, trace } from 'mobx';
import axios from "axios";
import { Product } from 'models/Product';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

const api = axios.create({
	baseURL: 'http://localhost:8000',
});

autorun(r => {
	r.trace()

	const request = {
		search:       filters.search.get(),
		price:        { min: filters.price.selectedMin, max: filters.price.selectedMax },
		size:         [...filters.size.selected],
		color:        [...filters.color.selected],
		amountInPack: { min: filters.amountInPack.selectedMin, max: filters.amountInPack.selectedMax },
	}
	console.log(request);

	api.post<any, any>('/' , request).then(response => {
		products.replace(response.data.products.map((x :any) => new Product(x.fields)));
		console.log(products);
	});
}, { delay: 500 })

if ('serviceWorker' in navigator) {
  const registration = navigator.serviceWorker.register('/service-worker.js');
}

export default null;