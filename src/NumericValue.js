import * as React from 'react';

export default function NumericalValue(props) {
	const { label, value, metric, precision } = props;
	let valueToDisplay;
	if (!precision || precision === 0) {
		valueToDisplay = Math.floor(value);
	} else {
		valueToDisplay = Number.parseFloat(value).toPrecision(precision || 1);
	}
	return <div className={`data ${label}`}>
			<div className="data__label">
				{label}
			</div>
			<div className="data__value">
				{valueToDisplay} {metric}
			</div>
		</div>
}
