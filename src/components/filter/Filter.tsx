import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import styles from './Filter.scss';


import filterStorage from 'storages/filterStorage';
import { observer } from 'mobx-react';
import tailwind from 'components/common/tailwind';

@observer
export default class Filter extends Component {

	render() {
		return (
		<div className={`${tailwind('container', 'grid', 'grid-cols-12')}`}>
			{ Object.entries(filterStorage.filters).map(([name, filter]) => `${name}: ${filter.join(', ')}`).join(', ') }
		</div>
		)
	}
}