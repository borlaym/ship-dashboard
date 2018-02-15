import * as React from 'react';

export default function PercentageValue(props) {
	const { label, value } = props;
	const valueToDisplay = Number.parseFloat(value * 100).toPrecision(4);
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
	return <div className={`data data-percentage ${label}`}>
		<div className="data__label">
			{label}
		</div>
		<div className="data__value">
			{valueToDisplay}%
		</div>
		<div className="data__bar-chart">
			<div className={`data__bar ${percentageClassName}`} style={{ width: `${value * 100}%` }}/>
		</div>
	</div>
}
