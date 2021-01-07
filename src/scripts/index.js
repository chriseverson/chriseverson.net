import '../styles/main.scss';

document.addEventListener('DOMContentLoaded', ev => domReady());

const domReady = () => {
  // window.setTimeout(loaded, 2000);
  loaded();
}

const loaded = () => {
  document.querySelector('body').classList.remove('preload');
}
