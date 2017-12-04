window.addEventListener('load', () => {
  injectElementIntoPage();
});

const injectElementIntoPage = () => {
  const injectDOM = document.createElement('li');
  injectDOM.className = 'inject-react-example';

  // const child = document.createElement('div');
  // child.id = 'yt-playlists';
  // injectDOM.appendChild(child);

  const script = document.createElement('script');
  script.src = 'https://localhost:3000/js/todoapp.bundle.js';
  document.body.appendChild(script);

  const eltToInject = document.querySelector('#browse-items-primary > ol'); //TODO put this in config
  eltToInject.insertBefore(injectDOM, eltToInject.firstChild);

  // const iframe = document.createElement('iframe');
  // iframe.src = chrome.extension.getURL(`inject.html?protocol=${location.protocol}`);
  // injectDOM.appendChild(iframe);

  // Load inject.pug into page
  const xhr = new XMLHttpRequest();
  xhr.open('get', chrome.extension.getURL(`inject.html?protocol=${location.protocol}`), true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      injectDOM.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
};

const retrievePlaylistSubscriptions = () => {
  chrome.storage.sync.get('yt-playlists', playlists => {

  });
};
