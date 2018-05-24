import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Homepage from './component/Hompage';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Homepage />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
