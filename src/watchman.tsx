import React from 'react';
import ReactDOM from 'react-dom/client';

const WatchmanApp = () => {
  const handleSwitchScreens = () => {
    window.electron.ipcRenderer.send('switch-screens');
  };

  return (
    <div>
      <h1>Watchman Screen</h1>
      <button onClick={handleSwitchScreens}>Cambiar pantallas</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WatchmanApp />
  </React.StrictMode>
);
