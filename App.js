import React, { Component } from "react";
import RootApp from "./RootApp";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(reducers, devToolsEnhancer());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    );
  }
}
