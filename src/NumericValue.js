import * as React from 'react';

export default function NumericalValue(props) {
	const { label, value, metric } = props;
	return <div className={`NumericValue ${label}`}>
			<div className="NumericValue__label">
				{label}
			</div>
			<div className="NumericValue__value">
				{value} {metric}
			</div>
		</div>
}