import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app/App';

ReactDOM.render(React.createElement(App), document.getElementById('root'));


if ('serviceWorker' in navigator) {
  const registration = navigator.serviceWorker.register('/service-worker.js');
}

export default null;