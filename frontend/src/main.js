'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import storeCreate from '../lib/store-create.js';
import App from './components/app';

let store = storeCreate();

let AppContainer = () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDom.render(<AppContainer/>,  document.getElementById('root'));
