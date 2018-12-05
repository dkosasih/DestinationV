import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './TitleBar';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TitleBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
