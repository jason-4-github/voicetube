import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Homepage from './containers/Hompage';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.less';
import './styles/index.less';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Homepage />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
