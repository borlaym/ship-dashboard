import * as React from 'react';

export default function PercentageValue(props) {
	const { label, value, precision } = props;
	const valueToDisplay = Number.parseFloat(value * 100).toPrecision(4);
	return <div className={`PercentageValue ${label}`}>
		<div className="PercentageValue__label">
			{label}
		</div>
		<div className="PercentageValue__value">
			{valueToDisplay}%
		</div>
	</div>
}