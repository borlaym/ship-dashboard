import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NumericValue from './NumericValue';
import TextValue from './TextValue';
import registerServiceWorker from './registerServiceWorker';
import scenario from './scenario.json';
import config from './config.json';
import './App.css';

let t = 0;
let lastModified = Date.now();
let phaseIndex = 1;
let pause = false;

const tick = () => {
	if (pause) {
		return;
	}
	const now = Date.now();
	const d = now - lastModified;
	t = t + d;

	if (scenario[phaseIndex] && t > scenario[phaseIndex].timestamp) {
		phaseIndex = phaseIndex + 1;
	}

	if (!scenario[phaseIndex]) {
		pause = true;
		return;
	}

	const currentPhase = scenario[phaseIndex];
	const previousPhase = scenario[phaseIndex - 1];
	const phaseDuration = currentPhase.timestamp - previousPhase.timestamp;
	const timeInCurrentDuration = t - previousPhase.timestamp;

	const values = currentPhase.values.map(({ label, value, type, on, metric, precision }, index) => {
		switch(type) {
			case 'numeric': {
				const previousPhaseValue = previousPhase.values[index].value;
				const newValue = previousPhaseValue + (timeInCurrentDuration / phaseDuration) * (value - previousPhaseValue);
				return <NumericValue label={label} value={newValue} metric={metric} precision={precision} />
			}
			case 'text': {
				return <TextValue label={label} value={previousPhase.values[index].value} on={on} />
			}
		}
		
	});

	ReactDOM.render(
		<div className="app">
			{values}
		</div>
	, document.getElementById('root'));
	window.setTimeout(tick, config.refreshInterval);
	lastModified = now;
};


ReactDOM.render(<div />, document.getElementById('root'));
registerServiceWorker();

tick();
