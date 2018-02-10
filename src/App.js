import React from 'react';
import './App.css';
import NumericValue from './NumericValue';

export default function App(props) {
	const { timestamp } = props;
	return (
		<div className="App">
			<NumericValue label="ALT" value={0} />
			<NumericValue label="TIME" value={timestamp} />
		</div>
	);
}
