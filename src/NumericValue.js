import * as React from 'react';

export default function NumericalValue(props) {
	const { label, value } = props;
	return <div className={`NumericValue ${label}`}>
			<div className="NumericalValue__label">
				{label}
			</div>
			<div className="NumericValue__value">
				{value}
			</div>
		</div>
}