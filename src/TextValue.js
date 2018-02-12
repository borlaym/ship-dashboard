import * as React from 'react';

export default function TextValue(props) {
	const { label, value, on } = props;
	return <div className={`data ${label} data--${on ? 'on' :'off' }`}>
		<div className="data__label">
			{label}
		</div>
		<div className="data__value">
			{value}
		</div>
	</div>
}
