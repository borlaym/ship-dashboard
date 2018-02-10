import React from 'react';
import './App.css';
import NumericValue from './NumericValue';

export default function App(props) {
	const { timestamp, alt } = props;
	return (
		<div className="App">
			<NumericValue label="ALT" value={alt} />
			<NumericValue label="TIME" value={timestamp} />
		</div>
	);
}
