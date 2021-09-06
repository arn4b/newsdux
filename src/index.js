import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import store from './app/store'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);