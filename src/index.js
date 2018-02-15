import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NumericValue from './NumericValue';
import TextValue from './TextValue';
import PercentageValue from './PercentageValue';
import registerServiceWorker from './registerServiceWorker';
import scenario from './scenario.json';
import config from './config.json';
import './App.css';

let t = 0;
let lastModified = Date.now();
let phaseIndex = 1;
let pause = true;

const changePause = () => {
	pause = !pause;
	if (!pause) {
		lastModified = Date.now();
		tick();
	}
}

const tick = () => {
	if (pause) {
		ReactDOM.render(
			<div className="app">
				<button onClick={changePause}>Play</button>
			</div>
			, document.getElementById('root'));
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
	const percentageInPhase = timeInCurrentDuration / phaseDuration;

	// Boolean
	const LDG_GEAR = currentPhase.LDG_GEAR;
	const BRAKES = currentPhase.BRAKES;
	const SOLAR = currentPhase.SOLAR;
	const ANTENNAS = currentPhase.ANTENNAS;

	// Numeric
	const PERIAPSIS = previousPhase.PERIAPSIS + percentageInPhase * (currentPhase.PERIAPSIS - previousPhase.PERIAPSIS);
	const APOAPSIS = previousPhase.APOAPSIS + percentageInPhase * (currentPhase.APOAPSIS - previousPhase.APOAPSIS);
	const INCLINATION = previousPhase.INCLINATION + percentageInPhase * (currentPhase.INCLINATION - previousPhase.INCLINATION);
	const ECCENTRICITY = previousPhase.ECCENTRICITY + percentageInPhase * (currentPhase.ECCENTRICITY - previousPhase.ECCENTRICITY);
	const ALT = previousPhase.ALT + percentageInPhase * (currentPhase.ALT - previousPhase.ALT);
	const SPD = previousPhase.SPD + percentageInPhase * (currentPhase.SPD - previousPhase.SPD);
	const DELTAV = previousPhase.DELTAV + percentageInPhase * (currentPhase.DELTAV - previousPhase.DELTAV);
	const TWR = previousPhase.TWR + percentageInPhase * (currentPhase.TWR - previousPhase.TWR);

	// Percentage
	const LIQUID_HYDROGEN = previousPhase.LIQUID_HYDROGEN + percentageInPhase * (currentPhase.LIQUID_HYDROGEN - previousPhase.LIQUID_HYDROGEN);
	const LIQUID_OXYGEN = previousPhase.LIQUID_OXYGEN + percentageInPhase * (currentPhase.LIQUID_OXYGEN - previousPhase.LIQUID_OXYGEN);
	const HYDROXILAMMONIUM_NITRATE = previousPhase.HYDROXILAMMONIUM_NITRATE + percentageInPhase * (currentPhase.HYDROXILAMMONIUM_NITRATE - previousPhase.HYDROXILAMMONIUM_NITRATE);

	ReactDOM.render(
		<div class="bigscreen-layout">
			<div class="bigscreen-layout__column">
				<div class="data-group">
					<div class="data">
						<h2 class="data__label">Call sign</h2>
						<p class="data__value">Alacrity</p>
					</div>
				</div>
				<div class="data-group data-group--twocol">
					<div class="data data--twocol">
						<h2 class="data__label">LDG gear</h2>
						<p class="data__value data__value--green">{LDG_GEAR ? 'DEP' : 'RET'}</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Brakes</h2>
						<p class="data__value data__value--green">{BRAKES ? 'DEP' : 'RET'}</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Solar</h2>
						<p class="data__value data__value--green">{SOLAR ? 'DEP' : 'RET'}</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Antennas</h2>
						<p class="data__value data__value--green">{ANTENNAS ? 'DEP' : 'RET'}</p>
					</div>
				</div>
				<div class="data-group--twocol">
					<div class="data data--twocol">
						<h2 class="data__label">Periapsis</h2>
						<p class="data__value data__value--green">{PERIAPSIS.toFixed(0)} m</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Apoapsis</h2>
						<p class="data__value data__value--green">{APOAPSIS.toFixed(0)} m</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Inclination</h2>
						<p class="data__value data__value--green">{INCLINATION.toFixed(1)} deg</p>
					</div>
					<div class="data data--twocol">
						<h2 class="data__label">Eccentricity</h2>
						<p class="data__value data__value--green">{ECCENTRICITY.toFixed(2)}</p>
					</div>
				</div>
				<div class="data-group">
					<div class="data data--large">
						<h2 class="data__label">ALT</h2>
						<p class="data__value">{ALT.toFixed(0)} m</p>
					</div>
				</div>
			</div>
			<div class="bigscreen-layout__column">
				<div class="data-group">
					<div class="data">
						<h2 class="data__label">Liquid Hydrogen</h2>
						<p class="data__value data__value--green">{(LIQUID_HYDROGEN * 100).toFixed(2)}%</p>
					</div>
					<div class="data">
						<h2 class="data__label">Liquid Oxygen</h2>
						<p class="data__value data__value--green">{(LIQUID_OXYGEN * 100).toFixed(2)}%</p>
					</div>
					<div class="data">
						<h2 class="data__label">Hydroxilammonium Nitrate</h2>
						<p class="data__value data__value--green">{(HYDROXILAMMONIUM_NITRATE * 100).toFixed(2)}%</p>
					</div>
				</div>
				<div class="data-group">
					<div class="data">
						<h2 class="data__label">&Delta;V</h2>
						<p class="data__value data__value--green">{DELTAV.toFixed(0)} m/s</p>
					</div>
					<div class="data">
						<h2 class="data__label">TWR</h2>
						<p class="data__value data__value--green">{TWR.toFixed(1)}</p>
					</div>
				</div>
				<div class="data-group">
					<div class="data data--large">
						<h2 class="data__label">SPD</h2>
						<p class="data__value">{SPD.toFixed(2)} Mach</p>
					</div>
				</div>
			</div>
			<button onClick={changePause}>{pause ? 'Play' : 'Pause'}</button>
		</div>
	, document.getElementById('root'));
	window.setTimeout(tick, config.refreshInterval);
	lastModified = now;
};


ReactDOM.render(<div />, document.getElementById('root'));
registerServiceWorker();

tick();
