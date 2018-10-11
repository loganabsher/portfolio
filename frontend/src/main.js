'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/app';

let store = appStoreCreate();

let AppContainer = () => {
  return(
    <Provider store={store}>
      <App />
      <p>things</p>
    </Provider>
  )
};

ReactDom.render(<AppContainer/>,  document.getElementById('root'));
