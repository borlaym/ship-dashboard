import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import scenario from './scenario.json';
import config from './config.json';

let t = 0;
let lastModified = Date.now();

const tick = () => {
	const now = Date.now();
	const d = now - lastModified;
	t = t + d;
	ReactDOM.render(
		<App
			timestamp={t}
			alt={t}
		/>
	, document.getElementById('root'));
	window.setTimeout(tick, config.refreshInterval);
	lastModified = now;
};


ReactDOM.render(<App data={{}} />, document.getElementById('root'));
registerServiceWorker();

tick();
