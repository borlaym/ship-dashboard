import * as React from 'react';

export default function PercentageValue(props) {
	const { label, value } = props;
	let percentageClassName;
	if (value > 0.75) {
		percentageClassName = 'data__bar-chart--value-75';
	} else if (value > 0.5) {
		percentageClassName = 'data__bar-chart--value-50';
	} else if (value > 0.25) {
		percentageClassName = 'data__bar-chart--value-25';
	} else {
		percentageClassName = 'data__bar-chart--red';
	}
	return (
		<div className="data">
			<h2 className="data__label">{label}</h2>
			<p className={'data__value' + (value < 0.25 ? ' data__value--red' : '')}>{(value * 100).toFixed(2)}%</p>
			<div className={`data__bar-chart ${percentageClassName}`}>
				<div className="data__bar" style={{ width: `${value * 100}%` }} />
				<div className="data__triangle data__triangle--25" />
				<div className="data__triangle data__triangle--50" />
				<div className="data__triangle data__triangle--75" />
			</div>
		</div>
	);
}
