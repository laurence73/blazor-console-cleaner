// Intercept console methods and store clean messages
(function() {
  const consoleLogs = [];
  const MAX_LOGS = 500;

  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  function cleanAndStore(type, args) {
    const timestamp = new Date().toLocaleTimeString();
    const message = Array.from(args).map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');

    consoleLogs.push({ type, message, timestamp });
    if (consoleLogs.length > MAX_LOGS) {
      consoleLogs.shift();
    }
  }

  // Wrap console methods
  ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
    console[method] = function(...args) {
      cleanAndStore(method, args);
      originalConsole[method].apply(console, args);
    };
  });

  // Listen for requests from popup
  window.addEventListener('message', (event) => {
    if (event.data.type === 'GET_CONSOLE_LOGS') {
      window.postMessage({ type: 'CONSOLE_LOGS', logs: consoleLogs }, '*');
    }
    if (event.data.type === 'CLEAR_CONSOLE_LOGS') {
      consoleLogs.length = 0;
    }
  });

  // Expose for chrome runtime messaging
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_LOGS') {
      sendResponse({ logs: consoleLogs });
    }
    if (request.type === 'CLEAR_LOGS') {
      consoleLogs.length = 0;
      sendResponse({ success: true });
    }
    return true;
  });
})();
