/*global overwolf*/

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import WindowNames from '../../common/constants/window-names';
import RunningGameService from '../../common/services/running-game-service';
import WindowsService from '../../common/services/windows-service';
import HotkeysService from '../../common/services/hotkeys-service';
import GEPService from '../../common/services/gep-service';
import ScreenshotService from '../../common/services/screenshots-service';
import EventBus from '../../common/services/event-bus';
import reducers from '../../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(ReduxThunk),
  ),
);
window.reduxStore = store;

class BackgroundController {
	static async run() {
		window.ow_eventBus = EventBus;

		BackgroundController._registerAppLaunchTriggerHandler();
		BackgroundController._registerHotkeys();
		
		let startupWindow = await WindowsService.getStartupWindowName();
		WindowsService.restore(startupWindow);

		let isGameRunning = RunningGameService.isGameRunning();
		if (isGameRunning) {
			GEPService.registerToGEP();
			await WindowsService.restore(WindowNames.IN_GAME);
			WindowsService.minimize(WindowNames.IN_GAME);
		}

		RunningGameService.addGameRunningChangedListener((isGameRunning) => {
			if (isGameRunning) {
				WindowsService.restore(WindowNames.IN_GAME);
			} else {
				// WindowsService.minimize(WindowNames.IN_GAME);
				console.log('closing app after game closed');
				window.close();
			}
		});
	}

	static _registerAppLaunchTriggerHandler() {
		overwolf.extensions.onAppLaunchTriggered.removeListener(
			BackgroundController._onAppRelaunch);
		overwolf.extensions.onAppLaunchTriggered.addListener(
			BackgroundController._onAppRelaunch);
	}

	static _onAppRelaunch() {
		WindowsService.restore(WindowNames.SETTINGS);
	}

	static _registerHotkeys() {
		HotkeysService.setTakeScreenshotHotkey(async () => {
			try {
				let screenshotUrl = await ScreenshotService.takeScreenshot();
				window.ow_eventBus.trigger('screenshot', screenshotUrl);
			} catch (e) {
				console.error(e);
			}
		});
	}
}

export default BackgroundController;