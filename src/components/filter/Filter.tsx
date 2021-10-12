import React, { Component, PropsWithoutRef } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import styles from './Filter.scss';


import { AnyFilter, MultiFilter, RadioFilter, RangeFilter, TextFilter } from 'storages/filters';
import { observer } from 'mobx-react';
import tailwind from 'components/common/tailwind';

@observer
export default class Filter extends Component<{ filter: AnyFilter }> {
	render() {
		const { filter, ...props } = this.props;

		console.log(filter.options);
	
		return (
			<div className={`flex flex-col gap-1 bg-gray-200 p-1`}>
				<div className={`text-xl`}>{filter.name}</div>
				{ filter instanceof MultiFilter ? [...filter.options].map((option) => <div className="flex"><label><input className="min-w-0" onChange={e => filter.toggle(e.target.value, e.target.checked)} type="checkbox" name={filter.name} value={option} checked={[...filter.selected].includes(option)}/> {option}</label></div>) : null }
				{ filter instanceof RadioFilter ? [...filter.options].map((option) => <div className="flex"><label><input className="min-w-0" onChange={e => filter.select(e.target.value)} type="radio" name={filter.name} value={option} checked={filter.selected == option}/> {option}</label></div>) : null }
				{ filter instanceof RangeFilter
					? <>
					<div className="flex">
						<input className="min-w-0" onChange={e => filter.setMin(e.target.value)} type="range" step={filter.step} name={`${filter.name}[min]`} value={filter.selectedMin} min={filter.min} max={filter.max}/>
					</div>
					<div className="flex">
						<input className="min-w-0" onChange={e => filter.setMax(e.target.value)} type="range" step={filter.step} name={`${filter.name}[max]`} value={filter.selectedMax} min={filter.min} max={filter.max}/>
					</div>
					</>
					: null }
				{ filter instanceof TextFilter
					? <>
					<div className="flex">
						<input className="min-w-0" onChange={e => filter.set(e.target.value)} type="text" name={filter.name} value={filter.text}/>
					</div>
					</>
					: null }
			</div>
		)
	}
}