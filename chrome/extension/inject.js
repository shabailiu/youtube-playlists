import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';

// chrome.storage.local.get('state', (obj) => {
//   const { state } = obj;
//   const initialState = JSON.parse(state || '{}');

window.addEventListener('load', async () => {
  await injectElementIntoPage();

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore({})} />,
    document.querySelector('#yt-playlists')
  );
});

const injectElementIntoPage = async () => {
  const injectDOM = document.createElement('li');
  injectDOM.className = 'inject-react-example';

  // const child = document.createElement('div');
  // child.id = 'yt-playlists';
  // injectDOM.appendChild(child);

  // const script = document.createElement('script'); //TODO why do we need this - bc the script isn't loading when in .pug
  // script.src = 'https://localhost:3000/js/todoapp.bundle.js';
  // document.body.appendChild(script);

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  eltToInject.insertBefore(injectDOM, eltToInject.firstChild);

  // const iframe = document.createElement('iframe');
  // iframe.src = chrome.extension.getURL(`inject.html?protocol=${location.protocol}`);
  // injectDOM.appendChild(iframe);

  // Load inject.pug into page
  try {
    const response = await axios.get(chrome.extension.getURL(`inject.html?protocol=${location.protocol}`));
    injectDOM.innerHTML = response.data;
    Promise.resolve();
  } catch (err) {
    Promise.reject(err);
  }

  // const xhr = new XMLHttpRequest();
  // xhr.open('get', chrome.extension.getURL(`inject.html?protocol=${location.protocol}`), true);
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     injectDOM.innerHTML = xhr.responseText;
  //   }
  // };
  // xhr.send();
};

const retrievePlaylistSubscriptions = () => {
  chrome.storage.sync.get('yt-playlists', playlists => {

  });
};
