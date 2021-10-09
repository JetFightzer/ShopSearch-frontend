import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import styles from './App.scss';
// import '../layout/typography.scss';

// import StartPage from '../pages/StartPage';
// import TodoPage  from '../pages/TodoPage';
// import AboutPage from '../pages/AboutPage';

import filterStorage from 'storages/filterStorage';
import { observer } from 'mobx-react';
import tailwind from 'components/common/tailwind';

@observer
export default class App extends Component {

	render() {
		console.log(styles);
		console.log(filterStorage);

		return (
		<div className={`${styles.App} ${tailwind('container', 'grid', 'lg:grid-cols-12', 'md:grid-cols-8')}`}>
			<div className={`${tailwind('col-span-2')}`}>
				{ Object.entries(filterStorage.filters).map(([name, filter]) => <div>{name}: {filter.join(', ')}</div>) }
			</div>
			<div className={`${tailwind('col-span-8', 'md:grid-cols-6')}`}>

			</div>
		</div>
		)
	}
}