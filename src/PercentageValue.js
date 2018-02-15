import * as React from 'react';

export default function PercentageValue(props) {
	const { label, value } = props;
	let percentageClassName;
	if (value > 0.75) {
		percentageClassName = 'value75';
	} else if (value > 0.5) {
		percentageClassName = 'value50';
	} else if (value > 0.25) {
		percentageClassName = 'value25';
	} else {
		percentageClassName = '';
	}
	return (
		<div className="data">
			<h2 className="data__label">{label}</h2>
			<p className="data__value data__value--green">{(value * 100).toFixed(2)} m</p>
			<div className="data__bar-chart">
				<div className={`data__bar ${percentageClassName}`} style={{ width: `${value * 100}%` }} />
				<div className="triangle25" />
				<div className="triangle50" />
				<div className="triangle75" />
			</div>
		</div>
	);
}
