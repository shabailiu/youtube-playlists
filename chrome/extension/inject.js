import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import Root from '../../app/containers/Root';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    /*
    <div>
        {env !== 'production' && <script src="chrome-extension://lmhkpmbekcpmknklioeibfkpmmfibljd/js/redux-devtools-extension.js" />}
        {env === 'production' ? <script src="/js/todoapp.bundle.js" /> : <script src="https://localhost:3000/js/todoapp.bundle.js" />}
      </div>
     */
    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open TodoApps
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('li');
  injectDOM.className = 'inject-react-example';

  const script = document.createElement('script');
  script.src = 'https://localhost:3000/js/todoapp.bundle.js';
  document.body.appendChild(script);

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  eltToInject.insertBefore(injectDOM, eltToInject.firstChild);
  // render(<InjectApp />, injectDOM);

  //
  // const createStore = require('../../app/store/configureStore');
  //
  // render(
  //   <Root store={createStore({})} />,
  //   injectDOM
  // );

  const xhr = new XMLHttpRequest();
  xhr.open('get', chrome.extension.getURL(`inject.html?protocol=${location.protocol}`), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      injectDOM.innerHTML = xhr.responseText;
    }
  };
  xhr.send();

  // const iframe = document.createElement('iframe');
  // iframe.src = chrome.extension.getURL(`inject.html?protocol=${location.protocol}`);
  // injectDOM.appendChild(iframe);
});
