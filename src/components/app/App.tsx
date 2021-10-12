import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import styles from './App.scss';
// import '../layout/typography.scss';

// import StartPage from '../pages/StartPage';
// import TodoPage  from '../pages/TodoPage';
// import AboutPage from '../pages/AboutPage';

import filters from 'storages/filters';
import products from 'storages/products';
import Filter from 'components/filter/Filter';
import { observer } from 'mobx-react';

@observer
export default class App extends Component {

	onSearchChange = (e) => {
		filters.search.set(e.target.value);
	}

	render() {
		console.log(styles);
		console.log(filters);

		return (
		<div className={`${styles.App} container mx-auto grid grid-cols-8 lg:grid-cols-10 gap-2`}>
			<div className="row-start-1 col-start-3 col-end-7 lg:col-end-9 flex flex-col gap-1 bg-gray-200 p-1">
				<span className="text-xl">Search</span> <input onChange={this.onSearchChange} type="text" name="search" value={filters.search.get()}/>
			</div>
			<div className="row-start-2 col-span-2 flex flex-col gap-2">
				<Filter filter={filters.price}/>
				<Filter filter={filters.size}/>
				<Filter filter={filters.color}/>
				<Filter filter={filters.amountInPack}/>
			</div>
			<div className="row-start-2 col-span-6 lg:col-span-8 grid grid-cols-6 lg:grid-cols-8 gap-2">
				{ products.map(product => {
					console.log(product);
					return (
						<div className="col-span-2" key={product.fields.id}>
							<div className="text-xl">{ product.fields.name }</div>
							<div>price: { product.fields.price }</div>
							<div>size: { product.fields.size }</div>
							<div>color: { product.fields.color.join(', ') }</div>
							<div>amountInPack: { product.fields.amountInPack }</div>
						</div>
					)
				}) }
			</div>
		</div>
		)
	}
}