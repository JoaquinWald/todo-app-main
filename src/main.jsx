// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { TodoApp } from './TodoApp';

import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <TodoApp />
  </Provider>
  // </React.StrictMode>,
)
