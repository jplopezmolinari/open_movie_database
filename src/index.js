import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './containers/Main';
import { ChakraProvider } from '@chakra-ui/react';

// import { createBrowserHistory } from 'history';

// const customHistory = createBrowserHistory();

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Main} />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,

  document.getElementById('root')
);
