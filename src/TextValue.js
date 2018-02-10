import * as React from 'react';

export default function TextValue(props) {
	const { label, value, on } = props;
	return <div className={`TextValue ${label} TextValue--${on ? 'on' :'off' }`}>
		<div className="TextValue__label">
			{label}
		</div>
		<div className="TextValue__value">
			{value}
		</div>
	</div>
}