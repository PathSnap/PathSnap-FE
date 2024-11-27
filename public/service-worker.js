if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(error => {
        console.error('SW registration failed: ', error);
      });
  }
  