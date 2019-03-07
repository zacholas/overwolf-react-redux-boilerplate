# overwolf-react-redux-boilerplate
This repo gets you started with everything you need to roll a React + Redux app in Overwolf.

Based on the Overwolf PUBG Dev samples from https://github.com/overwolf/pubg-dev-challenge-samples

Note: this repo probably won't be updated much, and is mostly meant to illustrate to you how React & Redux work together with Overwolf, rather than necessarily being a proper boilerplate that you might build your project on top of.

## Notes & How To Use
I won't go into too much detail here because you're still going to inevitably have to spend a lot of time learning how the overwolf app renders your React app before things start to make sense.

But with that being said, here are some key notes about how this all works, and why it's built the way that it is...

### Key Overwolf React Principles
- Overwolf renders a separate <App/> for each of your windows, rather than a separate component for each within one parent app.
- As such, you can't declare the redux store in the root-level component like you normally would.
- Overwolf recommends having a core "main window" that handles logic, state, etc. In this app, that "root window logic" is in `src/windows/background/BackgroundController.js`.
- If you open that file, you'll notice that _that_ is where we're defining the redux store, and then we're saving it as a variable on the main window.
- In our root-level component, we're accessing that main window (by using overwolf's `overwolf.windows.getMainWindow()` function) and getting the value of the reduxStore var. From there, we pass that into our provider like normal.

### Notes For Use
By default, Overwolf's events are all stored in `src/common/services/gep-service.js`. You'll notice that I am calling a sample action in there on click to increment the number stored in the app state.

### How to test that it's working
The best way to test that something's working is to call an action in one window, and have another window subscribed to the same central redux store, and log out the store's state in each of their render methods. If they both have the state get updated when you executed your action, then you know they are indeed getting driven by a central state.

## Disclaimer
Note that I am by no means an expert at React, Redux, or Overwolf. I'm very much figuring things out as I go.

## Okbye
Enjoy!

~Zach
