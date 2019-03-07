/*global overwolf*/

import screenshotService from './screenshots-service';
import { mouseClickAction } from '../../actions/';

const REQUIRED_FEATURES = ['kill'];
const REGISTER_RETRY_TIMEOUT = 10000;

function registerToGEP() {
	overwolf.games.events.setRequiredFeatures(REQUIRED_FEATURES, function (response) {
		if (response.status === 'error') {
			setTimeout(registerToGEP, REGISTER_RETRY_TIMEOUT);
		} else if (response.status === 'success') {
			overwolf.games.events.onNewEvents.removeListener(_handleGameEvent);
			overwolf.games.events.onNewEvents.addListener(_handleGameEvent);
      // overwolf.games.inputTracking.onMouseDown.removeListener(_handleClick);
      // overwolf.games.inputTracking.onMouseDown.addListener(_handleClick);
		}
	});
}

//* Onclick event; used mostly for debugging.
async function _handleClick(clickInfo) {
  const store = overwolf.windows.getMainWindow().reduxStore;
  store.dispatch(mouseClickAction);
}

async function _handleGameEvent(eventsInfo) {
	for (let eventData of eventsInfo.events) {
		switch (eventData.name) {
			case 'kill': {
				try {
					let screenshotUrl = await screenshotService.takeScreenshot();
					window.ow_eventBus.trigger('screenshot', screenshotUrl);
				} catch (e) {
					console.error(e);
				}

				break;
			}
		}
	}
}

export default { registerToGEP }