import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import scenario from './scenario.json';
import config from './config.json';

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

	const VALUE_ALT = previousPhase.alt + (timeInCurrentDuration / phaseDuration) * (currentPhase.alt - previousPhase.alt);

	ReactDOM.render(
		<App
			timestamp={t}
			alt={Math.floor(VALUE_ALT)}
		/>
	, document.getElementById('root'));
	window.setTimeout(tick, config.refreshInterval);
	lastModified = now;
};


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

tick();
